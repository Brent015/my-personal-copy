import { Form, Image, Input, InputNumber, UploadFile } from "antd";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import SortableImageUpload from "./sortable-image-upload";
import { EventFormData } from "./types";

const { TextArea } = Input;

interface EventDetailsSectionProps {
  control: Control<EventFormData>;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  control,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <Controller
        name="eventName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Event Title"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="eventImages"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Form.Item
            label="Event Images"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <SortableImageUpload
              value={value}
              onChange={onChange}
              onPreview={handlePreview}
            />
          </Form.Item>
        )}
      />

      <Controller
        name="eventHighlights"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Event Highlights"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <TextArea {...field} rows={4} />
          </Form.Item>
        )}
      />

      <Controller
        name="eventLocation"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Event Location"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="distance"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Distance from Manila"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <InputNumber
              className="w-full"
              {...field}
              addonAfter="km"
              type="number"
            />
          </Form.Item>
        )}
      />

      <Image
        style={{ display: "none" }}
        src={previewImage}
        preview={{
          visible: previewVisible,
          onVisibleChange: (visible) => {
            setPreviewVisible(visible);
            if (!visible) {
              setPreviewImage("");
            }
          },
          title: previewTitle,
        }}
      />
    </>
  );
};

export default EventDetailsSection;
