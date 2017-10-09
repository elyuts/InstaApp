export class User {
    id: number;
    user_name: string;
    full_name: string;
    profile_picture: string;
}

export class MediaResponse {
    type: string | MediaType;
    images: Images;
    carousel_media: MediaResponse[]
}

export class GetMediaResponse extends MediaResponse {
    id: string;
    user: User;
}

export class MediaType {
    static image = "image";
    static carousel = "carousel";
}

export class Images {
    thumbnail: Image;
    low_resolution: Image;
    standard_resolution: Image;
}

export class Image {
    wigth: number;
    height: number;
    url: string;
}