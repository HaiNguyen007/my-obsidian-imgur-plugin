// import fs from "fs";
import * as fs from "fs";
import ImgurClient from "../../imgur/ImgurClient";
import ImageUploader from "../ImageUploader";

function logImage(image: File) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  fs.appendFile("ImgurUploadedImages.log", `${image}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// const $image = 'https://i.imgur.com/abc123.jpg';

// logImage($image);

function createImgurLogFile() {
  // const logFilePath = ".obsidian/plugins/obsidian-imgur-plugin/ImgurUploadedImages.log";
  // const { basePath } = window.app.vault.adapter;
  // console.log(basePath);

  // eslint-disable-next-line prefer-destructuring, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const basePath = (window.app.vault.adapter as any).basePath;
  console.log(basePath);

  const logFilePath =
    ".obsidian/plugins/obsidian-imgur-plugin/ImgurUploadedImages.log";
  fs.open(logFilePath, "w", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Created log file: ${logFilePath}`);
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
    createImgurLogFile();
    logImage(image);
    return returnImageLink;
  }
}
