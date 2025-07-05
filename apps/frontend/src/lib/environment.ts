type Environment = {
  VITE_API_BASE_URL: string;
  VITE_LICHTING_IMAGES_PATH: string;
  VITE_LICHTING_IMAGES: string;
  VITE_AUTHORIZATION_URL_ENDPOINT_PATH: string;
};

export function getEnv(): Environment {
  // @ts-expect-error defined at runtime by Vite
  return import.meta.env;
}
