import axios from "axios";

const API_URL = "https://assignmentnodejsapi.herokuapp.com/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      password,
    });
  }

  autoComplete(username) {
    return axios.get("https://assignmentnodejsapi.herokuapp.com/api/test/all", {
      username
    });
  }


}

export default new AuthService();
