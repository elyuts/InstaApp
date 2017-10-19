export interface InstagramUser {
    id: number;
    username: string;
    full_name: string;
    profile_picture: string;
}

export interface InstagramMediaResponse {
    type: string | InstagramMediaType;
    images: Image;
    carousel_media: InstagramMediaResponse[]
}

export interface InstagramGetMediaResponse extends InstagramMediaResponse {
    id: string;
    user: InstagramUser;
}

export class InstagramMediaType {
    static image = "image";
    static carousel = "carousel";
}

export class Image {
    thumbnail: InstagramImage;
    low_resolution: InstagramImage;
    standard_resolution: InstagramImage;
}

export interface InstagramImage {
    wigth: number;
    height: number;
    url: string;
}