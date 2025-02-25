// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";

// import * as z from "zod";

// import { PATHS } from "@/constants/path";
// import { useDispatch } from "react-redux"; // Import redux dispatch
// import { setUser } from "@/redux/User/userSlice";
// import { useToast } from "@/hooks/use-toast";
// import authClient from "@/apis/clients/auth";

// const FormSchema = z.object({
//   username: z
//     .string()
//     .min(3, { message: "Username must be at least 3 characters" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" }),
// });

// type UserFormValue = z.infer<typeof FormSchema>;

// export default function UserAuthForm() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   const fakeAuth = (username: string) => {
//     const roles = {
//       admin: { role: "admin", name: "Admin User", accessToken: "admin-token" },
//       manager: {
//         role: "manager",
//         name: "Manager User",
//         accessToken: "manager-token",
//       },
//       // staff: { role: "staff", name: "Staff User", accessToken: "staff-token" },
//       // store: { role: "store", name: "Store User", accessToken: "store-token" },
//     };

//     return roles[username as keyof typeof roles] || null;
//   };

//   const onSubmit = async (data: UserFormValue) => {
//     const authData = fakeAuth(data.username);

//     if (!authData) {
//       toast({
//         title: "Tên đăng nhập hoặc mật khẩu không đúng",
//       });
//       return;
//     }

//     const { role, accessToken } = authData;

//     // Lưu vào Redux
//     dispatch(setUser({ role, accessToken }));
//     await authClient.auth({  user: authData,  });
//     toast({
//       title: "Chào mừng bạn quay trở lại",
//     }); 
//     if (role === "admin") {
//       router.push(PATHS.admin.overview);
//     } else if (role === "manager") {
//       router.push(PATHS.manager.serviceCategories);
//     } else if (role === "staff") {
//       router.push(PATHS.staff.myTasks);
//     }
//   };

//   return (
//     <>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="w-full space-y-2"
//         >
//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tài khoản</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Vui lòng nhập tên đăng nhập của bạn..."
//                     {...field}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Mật khẩu</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Vui lòng nhập mật khẩu của bạn..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button className="ml-auto w-full" type="submit">
//             Đăng nhập
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// }


"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoginSchema, TLoginRequest } from "@/schema/auth.schema";
import envConfig from "@/schema/config";
import { useAppContext } from "@/app/AppProvider";

const UserAuthForm = () => {
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setSessionToken } = useAppContext();
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: TLoginRequest) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_HOMEPLUS_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      console.log("🚀 ~ onSubmit ~ result:", result);
      toast({
        description: result.payload.message,
        // variant: 'success'
      });

      const resultFromNextServer = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      
      setSessionToken(resultFromNextServer.payload.data.token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "username" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          title: "Đã có lỗi xảy ra, vui lòng thử lại!",
          description: error.payload.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default UserAuthForm;

