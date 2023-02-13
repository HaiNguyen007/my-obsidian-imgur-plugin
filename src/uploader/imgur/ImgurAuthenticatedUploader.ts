// import fs from "fs";
import * as fs from "fs";
import ImgurClient from "../../imgur/ImgurClient";
import ImageUploader from "../ImageUploader";

function logImgurImages(image: File) {
  // eslint-disable-next-line prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const basePath = (window.app.vault.adapter as any).basePath;

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const logFilePath = `${basePath}/.obsidian/plugins/obsidian-imgur-plugin/ImgurUploadedImages.log`;

  fs.open(logFilePath, "a", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    // const logMessage =
    //   `lastModifiedDate: ${image.lastModifiedDate}\n` +
    //   `name: "${image.name}"\n` +
    //   `path: "${image.path}"\n` +
    //   `size: ${image.size}\n` +
    //   `type: "${image.type}"\n` +
    //   `webkitRelativePath: "${image.webkitRelativePath}"\n` +
    //   `[[Prototype]]: ${Object.getPrototypeOf(image)}\n`;

    const logMessage =
      // eslint-disable-next-line no-useless-concat
      `name: "${image.name}", ` +
      `size: "${image.size}", ` +
      `type: "${image.type}", `;

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fs.appendFile(logFilePath, `${logMessage}\n`, (error) => {
      if (error) {
        console.error(error);
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
    logImgurImages(image);
    return returnImageLink;
  }
}
