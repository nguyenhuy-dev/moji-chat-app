import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";
import { AxiosError } from "axios";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.clear();
        useChatStore.getState().reset();
      },

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      signUp: async (username, password, email, firstName, lastName) => {
        try {
          set({ loading: true });

          // gọi api
          await authService.signUp(
            username,
            password,
            email,
            firstName,
            lastName
          );

          toast.success(
            "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập."
          );
        } catch (error) {
          console.error(error);
          toast.error("Đăng ký không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (username, password) => {
        try {
          set({ loading: true });

          localStorage.clear();
          useChatStore.getState().reset();

          const { accessToken } = await authService.signIn(username, password);
          set({ accessToken });

          await get().fetchMe();
          useChatStore.getState().fetchConversations();

          toast.success("Chào mừng bạn quay lại với Moji 🎉");
        } catch (error) {
          console.error(error);
          toast.error("Đăng nhập không thành công!");
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          get().clearState();

          await authService.signOut();

          toast.success("Đăng xuất thành công!");
        } catch (error) {
          console.error(error);
          toast.error("Lỗi xảy ra khi đăng xuất. Hãy thử lại");
        }
      },

      fetchMe: async () => {
        try {
          set({ loading: true });

          const user = await authService.fetchMe();

          set({ user });
        } catch (error) {
          console.error(error);
          set({ user: null, accessToken: null });
          toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
        } finally {
          set({ loading: false });
        }
      },

      refresh: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe } = get();
          const accessToken = await authService.refresh();

          set({ accessToken });

          if (!user) await fetchMe();
        } catch (error: unknown) {
          console.error(error);

          if (
            error instanceof AxiosError &&
            (!error?.response?.data?.status ||
              error?.response?.data?.status !== "NoToken")
          ) {
            toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
          }

          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // chỉ persist user
    }
  )
);
