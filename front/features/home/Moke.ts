import { IImages } from "types/images";

interface IProduct {
  title: string,
  image: IImages,
  images_gallery: IImages[]
}

const mokeProduct: IProduct[] = [
  {
  title: "Товар 1",
  image: { mobile: "prod1_1.jpg", tablet: "prod1_1.jpg", desktop: "prod1_1.jpg" },
  images_gallery: [
    { mobile: "prod1_1.jpg", tablet: "prod1_1.jpg", desktop: "prod1_1.jpg" },
    { mobile: "prod1_2.jpg", tablet: "prod1_2.jpg", desktop: "prod1_2.jpg" },
    { mobile: "prod1_3.jpg", tablet: "prod1_3.jpg", desktop: "prod1_3.jpg" },
    { mobile: "prod1_4.jpg", tablet: "prod1_4.jpg", desktop: "prod1_5.jpg" }
  ]
},
  {
    title: "Товар 2",
    image: { mobile: "prod2_1.jpg", tablet: "prod2_1.jpg", desktop: "prod2_1.jpg" },
    images_gallery: [
      { mobile: "prod2_1.jpg", tablet: "prod2_1.jpg", desktop: "prod2_1.jpg" },
      { mobile: "prod2_2.jpg", tablet: "prod2_2.jpg", desktop: "prod2_2.jpg" },
      { mobile: "prod2_3.jpg", tablet: "prod2_3.jpg", desktop: "prod2_3.jpg" },
      { mobile: "prod2_4.jpg", tablet: "prod2_4.jpg", desktop: "prod2_5.jpg" }
    ]
  }
];

export { mokeProduct };
export type { IProduct };

