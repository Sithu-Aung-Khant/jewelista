export type Testimonial = {
  id: number;
  image?: string;
  name: string;
  position: string;
  description: string;
  imageType?: string;
};

export type RandomUser = {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  picture: {
    medium: string;
    large: string;
  };
};
