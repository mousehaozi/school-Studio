import { ref } from "vue";
import { defineStore } from "pinia";

const TOKEN_STORAGE_KEY = "studio_admin_token";
const STUDIO_ID_STORAGE_KEY = "studio_admin_studio_id";
const ROLE_STORAGE_KEY = "studio_admin_role";
const USERNAME_STORAGE_KEY = "studio_admin_username";

function loadToken() {
  return (
    localStorage.getItem(TOKEN_STORAGE_KEY) ||
    sessionStorage.getItem(TOKEN_STORAGE_KEY) ||
    ""
  );
}

function loadStudioId() {
  const val =
    localStorage.getItem(STUDIO_ID_STORAGE_KEY) ||
    sessionStorage.getItem(STUDIO_ID_STORAGE_KEY);
  return val ? parseInt(val) : null;
}

function loadRole() {
  return (
    localStorage.getItem(ROLE_STORAGE_KEY) ||
    sessionStorage.getItem(ROLE_STORAGE_KEY) ||
    ""
  );
}

function loadUsername() {
  return (
    localStorage.getItem(USERNAME_STORAGE_KEY) ||
    sessionStorage.getItem(USERNAME_STORAGE_KEY) ||
    ""
  );
}

export const useUserStore = defineStore("user", () => {
  const token = ref(loadToken());
  const studioId = ref(loadStudioId());
  const role = ref(loadRole());
  const username = ref(loadUsername());

  function setToken(nextToken, options = {}) {
    const {
      persist = true,
      storage = "local",
      studioId: nextStudioId = null,
      role: nextRole = "",
      username: nextUsername = "",
    } = options;

    token.value = nextToken || "";
    studioId.value = nextStudioId;
    role.value = nextRole;
    username.value = nextUsername;

    if (!persist) return;

    if (!token.value) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(STUDIO_ID_STORAGE_KEY);
      sessionStorage.removeItem(STUDIO_ID_STORAGE_KEY);
      localStorage.removeItem(ROLE_STORAGE_KEY);
      sessionStorage.removeItem(ROLE_STORAGE_KEY);
      localStorage.removeItem(USERNAME_STORAGE_KEY);
      sessionStorage.removeItem(USERNAME_STORAGE_KEY);
      return;
    }

    const targetStorage = storage === "session" ? sessionStorage : localStorage;
    const otherStorage = storage === "session" ? localStorage : sessionStorage;

    targetStorage.setItem(TOKEN_STORAGE_KEY, token.value);
    if (studioId.value !== null) {
      targetStorage.setItem(STUDIO_ID_STORAGE_KEY, studioId.value);
    }
    if (role.value) {
      targetStorage.setItem(ROLE_STORAGE_KEY, role.value);
    }
    if (username.value) {
      targetStorage.setItem(USERNAME_STORAGE_KEY, username.value);
    }

    otherStorage.removeItem(TOKEN_STORAGE_KEY);
    otherStorage.removeItem(STUDIO_ID_STORAGE_KEY);
    otherStorage.removeItem(ROLE_STORAGE_KEY);
    otherStorage.removeItem(USERNAME_STORAGE_KEY);
  }

  function logout() {
    token.value = "";
    studioId.value = null;
    role.value = "";
    username.value = "";
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(STUDIO_ID_STORAGE_KEY);
    sessionStorage.removeItem(STUDIO_ID_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    sessionStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem(USERNAME_STORAGE_KEY);
    sessionStorage.removeItem(USERNAME_STORAGE_KEY);
  }

  return { token, studioId, role, username, setToken, logout };
});
