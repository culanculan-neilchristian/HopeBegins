'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Heart, Upload, X } from 'lucide-react';
import Image from 'next/image';
import hopeStoryService from '@/services/hopeStoryService';

const MAX_WORDS = 200;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  occupation: z.string().optional(),
  testimonial: z
    .string()
    .min(10, 'Testimonial must be at least 10 characters')
    .refine((val) => val.split(/\s+/).filter(Boolean).length <= MAX_WORDS, {
      message: `Testimonial must be ${MAX_WORDS} words or less`,
    }),
  photo: z
    .any()
    .refine(
      (files) =>
        !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      'Max image size is 5MB.'
    )
    .refine(
      (files) =>
        !files ||
        files?.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});

interface SubmitHopeStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitHopeStoryModal({
  isOpen,
  onClose,
}: SubmitHopeStoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      occupation: '',
      testimonial: '',
    },
  });

  const testimonialValue = form.watch('testimonial') || '';
  const wordCount = testimonialValue.split(/\s+/).filter(Boolean).length;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const data = {
        full_name: values.full_name,
        occupation: values.occupation,
        testimonial: values.testimonial,
        photo: values.photo?.[0],
      };

      await hopeStoryService.submitStory(data);
      toast.success(
        'Hope story submitted successfully! It will be reviewed by our team.'
      );
      form.reset();
      setPreviewUrl(null);
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to submit hope story. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    form.setValue('photo', undefined);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Your Hope Story"
      description="Submit how HopeBegins helped you in your journey. Share your testimonial here."
      icon={<Heart className="h-6 w-6 text-rose-500 fill-rose-500" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name for Display</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Teacher, Student, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testimonial"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Testimonial</FormLabel>
                  <span
                    className={`text-xs font-medium ${wordCount > MAX_WORDS ? 'text-red-500' : 'text-zinc-400'}`}
                  >
                    {wordCount}/{MAX_WORDS} words
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Share your story here..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem>
                <FormLabel>Upload Photo</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {!previewUrl ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                          <p className="text-sm text-zinc-500 font-medium">
                            Click to upload photo
                          </p>
                          <p className="text-xs text-zinc-400 mt-1">
                            Portrait photos work best (Max 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          accept={ACCEPTED_IMAGE_TYPES.join(',')}
                          onChange={(e) => {
                            handleImageChange(e);
                            onChange(e.target.files);
                          }}
                        />
                      </label>
                    ) : (
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden group border-2 border-zinc-100 dark:border-zinc-800">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white transition-opacity opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-base font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Story'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full h-12 rounded-2xl text-zinc-500 font-medium"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
