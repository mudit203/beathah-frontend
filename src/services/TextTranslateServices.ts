import axios from "axios";

const TextTranslateServices = {
  translateText: async (text: any, translateFrom: any, translateTo: any) => {
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    );
    return response.data;
  },
};

export default TextTranslateServices;
