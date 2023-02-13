// import fs from "fs";
import * as fs from "fs";
import ImgurClient from "../../imgur/ImgurClient";
import ImageUploader from "../ImageUploader";

function logImgurImages(image: File) {
  // eslint-disable-next-line prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const basePath = (window.app.vault.adapter as any).basePath;
  console.log("basePath: ", basePath);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const logFilePath = `${basePath}/.obsidian/plugins/obsidian-imgur-plugin/ImgurUploadedImages.log`;

  fs.open(logFilePath, "a", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Opened log file: ${logFilePath}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fs.appendFile(logFilePath, `${image}\n`, (appendErr) => {
      if (appendErr) {
        console.error(appendErr);
      }
    });
  });
}

export default class ImgurAuthenticatedUploader implements ImageUploader {
  constructor(readonly client: ImgurClient) {}

  async upload(image: File): Promise<string> {
    const imgurImageLink = (await this.client.upload(image)).data.link;
    // return (await this.client.upload(image)).data.link;
    console.log("imgurImageLink: ", imgurImageLink);
    // console.log("image: ", image);
    const localImageLink = image.name;
    const returnImageLink = `${imgurImageLink}?${localImageLink}`;
    console.log("returnImageLink: ", returnImageLink);
    logImgurImages(image.name);
    return returnImageLink;
  }
}
