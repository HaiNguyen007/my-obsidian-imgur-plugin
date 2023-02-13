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

    // const today = new Date();
    // const uploadedTimestamp = `${today.getFullYear().toString().substr(2)}${`0${
    //   today.getMonth() + 1
    // }`.slice(-2)}${`0${today.getDate()}`.slice(
    //   -2
    // )}-${g`0${today.getHours()}`.slice(-2)}${`0${today.getMinutes()}`.slice(
    //   -2
    // )}`;

    const logMessage =
      // eslint-disable-next-line no-useless-concat, @typescript-eslint/restrict-template-expressions
      // const todayTimestamp = new Date().toString();
      // `uploadedTimestamp: "${uploadedTimestamp}", ` +
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // `lastModifiedDate: "${image.lastModifiedDate}", ` +
      `name: "${image.name}", ` +
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // `path: "${image.path}", ` +
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
