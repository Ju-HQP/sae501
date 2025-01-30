export const selectUserIsConnected = (state) => state.user.connected;

export const selectUserIsConnecting = (state) => state.user.isConnecting;

export const selectUserInfos = (state) => state.user.userInfos;

export const selectUserIsAdmin = (state) => state.user.isAdmin;

export const selectErrorLogin = (state) => state.user.errors.apiErrorLogin;

export const selectErrorLogout = (state) => state.user.errors.apiErrorLogout;

export const selectResetMessage = (state) => state.user.resetMessage;

export const selectSendMailMessage = (state) => state.user.sendMailMessage;

export const selectImageEdit = (state) => state.user.imageEdit;

export const selectRedirectToProfile = (state) => state.user.redirectToProfile;

export const selectLoading = (state) => state.user.loading;
