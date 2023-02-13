// import fs from "fs";
import * as fs from "fs";
import ImgurClient from "../../imgur/ImgurClient";
import ImageUploader from "../ImageUploader";

function logImage(image: string) {
  fs.appendFile("ImgurUploadedImages.log", `${image}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// const $image = 'https://i.imgur.com/abc123.jpg';

// logImage($image);

export default class ImgurAuthenticatedUploader implements ImageUploader {
  constructor(readonly client: ImgurClient) {}

  async upload(image: File): Promise<string> {
    const imgurImageLink = (await this.client.upload(image)).data.link;
    // return (await this.client.upload(image)).data.link;
    // console.log("imgurImageLink: ", imgurImageLink);
    // console.log("image: ", image);
    const localImageLink = image.name;
    const returnImageLink = `${imgurImageLink}?${localImageLink}`;
    console.log("returnImageLink: ", returnImageLink);
    logImage(image);
    return returnImageLink;
  }
}
