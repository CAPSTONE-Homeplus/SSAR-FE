// "use client";
// import React from "react";
// import {
//   Credenza,
//   CredenzaTrigger,
//   CredenzaContent,
//   CredenzaHeader,
//   CredenzaTitle,
//   CredenzaDescription,
//   CredenzaFooter,
//   CredenzaClose,
// } from "@/components/ui/credenza"; // Import from Credenza
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ServiceActivityUpdateSchema, TServiceActivityUpdateRequest } from "@/schema/service-activity.schema";
// type Props = {
//   className?: string;
//   initialData: TServiceActivityUpdateRequest; // Data passed to update form
// };

// export function CredenzaUpdateService({ className, initialData }: Props) {
//   const { toast } = useToast();
//   const form = useForm<TServiceActivityUpdateRequest>({
//     resolver: zodResolver(ServiceActivityUpdateSchema),
//     defaultValues: initialData, // Setting mock data as the default form values
//   });

//   const onSubmit = async (data: TServiceActivityUpdateRequest) => {
//     console.log("Updated data: ", data); // Log the updated data
//     toast({
//       title: "Cập nhật dịch vụ thành công",
//     });
//     form.reset(); // Reset form after successful submit
//   };

//   return (
//     <Credenza>
//       <CredenzaTrigger asChild className={className}>
//         <Button variant="default">Cập Nhật Dịch Vụ</Button>
//       </CredenzaTrigger>
//       <CredenzaContent className="sm:max-w-[425px]">
//         <CredenzaHeader>
//           <CredenzaTitle>Cập Nhật Dịch Vụ</CredenzaTitle>
//           <CredenzaDescription>Cập nhật thông tin dịch vụ</CredenzaDescription>
//         </CredenzaHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Tên Dịch Vụ
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="Tên dịch vụ..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="description" className="text-right">
//                   Mô Tả
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="Mô tả..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="status" className="text-right">
//                   Trạng Thái
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="status"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="Trạng thái..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="price" className="text-right">
//                   Giá
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="Giá..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="discount" className="text-right">
//                   Giảm Giá
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="discount"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="Giảm giá..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="prorityLevel" className="text-right">
//                   Mức Ưu Tiên
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="prorityLevel"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="Mức ưu tiên..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="duration" className="text-right">
//                   Thời Gian
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="duration"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="Thời gian..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="maxCapacity" className="text-right">
//                   Sức Chứa
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="maxCapacity"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="Sức chứa..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="serviceCode" className="text-right">
//                   Mã Dịch Vụ
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="serviceCode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="Mã dịch vụ..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="isFeatured" className="text-right">
//                   Nổi Bật
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="isFeatured"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Checkbox {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="isAvailable" className="text-right">
//                   Có Sẵn
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="isAvailable"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Checkbox {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="code" className="text-right">
//                   Mã Dịch Vụ
//                 </Label>
//                 <div className="col-span-3">
//                   <FormField
//                     control={form.control}
//                     name="code"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input placeholder="Mã dịch vụ..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//             <CredenzaFooter>
//               <Button type="submit">Cập Nhật</Button>
//               <CredenzaClose asChild>
//                 <Button type="button" variant="secondary">
//                   Đóng
//                 </Button>
//               </CredenzaClose>
//             </CredenzaFooter>
//           </form>
//         </Form>
//       </CredenzaContent>
//     </Credenza>
//   );
// }
