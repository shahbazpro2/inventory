// Base URLS

// Localhost
export const baseURL = "https://app.inventorygraphics.com/";
export const baseURLWithoutSlash = "https://app.inventorygraphics.com";

export const userCreateEndPoint = baseURL + "auth/users/"
export const activationURL = baseURL + "auth/users/activation/"
export const forgotPassURL = baseURL + "auth/users/reset_password/"
export const reSendEmailURL = baseURL + "auth/users/resend_activation/"
export const LOG_IN_JWT = baseURL + "auth/jwt/create/"
export const getUserData = baseURL + "auth/users/me/"
export const userPreferences=baseURL+"api/my/preferences/"
export const refreshToken=baseURL+"auth/jwt/refresh/"
export const createNewPassword=baseURL+"auth/users/reset_password_confirm/"
export const adminLink=baseURL+"fr/admin/users/"
export const singleProcessedData=baseURL+"processed/images/"
export const allProcessedData=baseURL+"fr/admin/users/csv_processed/"
export const saveProcessedImage=baseURL+"processed/edit/"
export const getSummary=baseURL+"summary/"
export const imageLink="https://app.inventorygraphics.com/media/"
