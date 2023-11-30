export const topBarHeight = 50
export const footerBarHeight = 30;
export const sideNavWidth = 260
export const navbarHeight = 50
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200
export const addressLength = 150
export const nameCharLength = 30
export const emailCharLength = 50
export const mobileCharLength = 10
export const serviceEnggRoleId = 4

export const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
export const addressRegex = /^[a-zA-Z0-9\s,.'-\/]{3,}$/;
export const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
export const getFixIndex = (index, page, rowsPerPage) => {
    const number = (page) * rowsPerPage + index;
    return number;
}
export const numberValidator = val => {
    const numVal = val.toLowerCase();
    const numPattern = /^[0-9]+/;
    if (numVal && numVal >= 12) {
      const isNumValid = numPattern.test(numVal);
      return isNumValid;
    } else {
      return false;
    }
  };
  
export const emailValidator = (value) => {
    let emailVal = value?.toLowerCase();
    let emailPattern = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (emailVal && emailVal.length > 0) {
      let isValidEmail = emailPattern.test(emailVal);
      return isValidEmail;
    } else {
      return false;
    }
  };
 export const validateDomain = (value) => {
    const domainPattern = /^[a-zA-Z0-9.-]+$/;
    return domainPattern.test(value);
  };
  
 export const validateHost = (value) => {
    const hostPattern = /^[a-zA-Z0-9.-]+$/;
    return hostPattern.test(value);
  };
  
 export const validateUrl = (value) => {
    const urlPattern = /^(http|https):\/\/.*$/;
    return urlPattern.test(value);
  };
  
export const validatePort = (value) => {
    const portPattern = /^\d{3}$/;
    return portPattern.test(value);
  };