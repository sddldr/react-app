'use client';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { Spinner } from '~/components/ui/spinner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { B } from 'node_modules/react-router/dist/development/router-CwNp5l9u.mjs';

const formSchema = z.object({
  product: z.string().min(5, {
    message: 'Product must be at least 5 characters.',
  }),
  price: z.coerce.number().min(1, {
    message: 'Price must be at least 1.',
  }),
  number: z.coerce.number().min(1, {
    message: 'Number must be at least 1.',
  }),
});

export function AddOrder({ isEdit = false }: { isEdit?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: '',
      price: 0,
      number: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    // Simulate an async operation like a server request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  }

  const handleClose = () => {
    setOpen(false);
    form.reset(); // 重置表单值和校验状态
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) form.reset(); // ✅ 关闭时统一重置
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {isEdit ? 'Edit order' : 'Add order'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit order' : 'Add order'}</DialogTitle>
          <DialogDescription>
            Fill in the product information and submit to create a new order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Product name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormDescription>
                      This is your Product price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input onChange={(e) => field.onChange(e.target.value)} />
                    </FormControl>
                    <FormDescription>
                      This is your Product number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                variant="secondary"
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={loading}
                className="cursor-pointer"
              >
                {loading && <Spinner className="mr-2" />}
                {loading ? 'Submiting…' : 'Submit'}
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
