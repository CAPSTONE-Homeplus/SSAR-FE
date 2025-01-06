"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { HouseSchema, THouseRequest } from "@/schema/house.schema";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui/credenza";

type Props = {
  houseData: THouseRequest; // Data passed to update form
};

export function CredenzaUpdateHouse({ houseData }: Props) {
  const { toast } = useToast();
  const form = useForm<THouseRequest>({
    resolver: zodResolver(HouseSchema),
    defaultValues: houseData,
  });

  const onSubmit = async (data: THouseRequest) => {
    console.log("House Updated: ", data);
    toast({
      title: "Cập nhật nhà thành công",
    });
    form.reset();
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="default">Cập Nhật Nhà</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Cập Nhật Nhà</CredenzaTitle>
          <CredenzaDescription>Cập nhật thông tin nhà</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Nhà</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên nhà..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô Tả</FormLabel>
                    <FormControl>
                      <Input placeholder="Mô tả..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Building ID..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người Tạo</FormLabel>
                    <FormControl>
                      <Input placeholder="Người tạo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="updatedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người Cập Nhật</FormLabel>
                    <FormControl>
                      <Input placeholder="Người cập nhật..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CredenzaFooter>
              <Button type="submit">Cập Nhật</Button>
              <CredenzaClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </CredenzaClose>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
}
