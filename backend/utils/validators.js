export const passwordValid = (pwd) => {
  // 8-16 chars, at least one uppercase and one special char
  const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;
  return re.test(pwd);
};
