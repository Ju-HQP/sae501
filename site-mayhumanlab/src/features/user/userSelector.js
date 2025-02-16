import { createSelector } from "@reduxjs/toolkit";

export const selectUserIsConnected = (state) => state.user.connected;

export const selectUserIsConnecting = (state) => state.user.isConnecting;

export const selectUserInfos = (state) => state.user.userInfos;

export const selectErrorLogin = (state) => state.user.errors.apiErrorLogin;

export const selectErrorLogout = (state) => state.user.errors.apiErrorLogout;

export const selectResetMessage = (state) => state.user.resetMessage;

export const selectSendMailMessage = (state) => state.user.sendMailMessage;

export const selectErrorUpdate = (state) => state.user.errors.apiErrorUpdate;

export const selectDatasSend = (state) => state.user.datasSend;

export const selectErrorImageUpdate = (state) => state.user.errors.apiErrorUpdateImage;

export const selectImageEdit = (state) => state.user.imageEdit;

export const selectRedirectToProfile = (state) => state.user.redirectToProfile;

export const selectLoading = (state) => state.user.loading;

export const selectInitialFormValues = createSelector(
    selectUserInfos, selectDatasSend,
    (user, datas) => {
            if (Object.keys(datas).length > 0) {
                return datas;
            }else{
                if(user && Array.isArray(user.competences)){
                    const nomComp = user.competences.map((comp) => comp.nom_c);
                    return {
                        ...user, nom_c : nomComp.join('-')
                    }
                }
                return user
            }
           
    }
);

export const selectIsAdmin = createSelector(
    selectUserInfos,
    (user) => {
        if (user){
            // Role_b est un tableau avec toujours un élément
            if ((user.role_b[0] === "ROLE_ADMIN") || (user.role_b===1)){
                return true;
            }
            return false;
        }
    }
);