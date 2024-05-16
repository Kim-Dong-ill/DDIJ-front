export const uName = {
  required: {
    value: true,
    message: "이름은 필수입니다.",
  },
  maxLength: {
    value: 6,
    message: "6자 이내로 입력해주세요",
  },
};
export const uEmail = {
  required: {
    value: true,
    message: "이메일은 필수입니다.",
  },
  pattern: {
    value: /^\S+@\S+$/i,
    message: "이메일 형식을 다시 입력하세요",
  },
};
export const uPassword = {
  required: {
    value: true,
    message: "비밀번호는 필수입니다.",
  },
  minLength: {
    value: 6,
    message: "6자 ~ 12자 이내로 입력해주세요",
  },
  maxLength: {
    value: 12,
    message: "6자 ~ 12자 이내로 입력해주세요",
  },
};
export const uNickName = {
  required: {
    value: true,
    message: "닉네임은 필수입니다.",
  },
  maxLength: {
    value: 8,
    message: "8자 이내로 입력해주세요",
  },
};
export const uAdress = {
  required: {
    value: true,
    message: "주소는 필수입니다.",
  },
};
export const pName = {
  required: {
    value: true,
    message: " 반려견 이름은 필수입니다.",
  },
  maxLength: {
    value: 8,
    message: "8자 이내로 입력해주세요",
  },
};
export const pBreed = {
  required: {
    value: true,
    message: "견종은 필수입니다.",
  },
  maxLength: {
    value: 14,
    message: "14자 이내로 입력해주세요",
  },
};
export const pAge = {
  required: {
    value: true,
    message: "나이는 필수입니다.",
  },
  maxLength: {
    value: 2,
    message: "적절한 나이를 입력해주세요",
  },
};
export const pChar = {
  required: {
    value: true,
    message: "성격은 필수입니다.",
  },
  maxLength: {
    value: 30,
    message: "더이상 입력하 수 없습니다.",
  },
};
