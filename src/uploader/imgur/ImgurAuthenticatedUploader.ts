import ImgurClient from "../../imgur/ImgurClient";
import ImageUploader from "../ImageUploader";

export default class ImgurAuthenticatedUploader implements ImageUploader {
  constructor(readonly client: ImgurClient) {}

  async upload(image: File): Promise<string> {
    const imgurImageLink = (await this.client.upload(image)).data.link;
    // return (await this.client.upload(image)).data.link;
    console.log("imgurImageLink: ", imgurImageLink);
    return imgurImageLink;
  }
}
