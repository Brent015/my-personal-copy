import { CloseOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { Form, Input, InputNumber, Select, Tabs, Typography } from "antd";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { EventFormData } from "./types";

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

interface PackageDetailsSectionProps {
  control: Control<EventFormData>;
}

interface PackageFormProps {
  control: Control<EventFormData>;
  index: number;
}

const PackageForm: React.FC<PackageFormProps> = ({ control, index }) => {
  const calculateGuestPrice = (price: number) => {
    return price + price * 0.06;
  };

  return (
    <div>
      <Controller
        name={`packages.${index}.title`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Title"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.description`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Description"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <TextArea {...field} rows={4} />
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.duration`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Duration"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <InputNumber {...field} min={1} addonAfter="days" />
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.price`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Price"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <InputNumber
              {...field}
              min={0}
              addonBefore="Php"
              onChange={(value) => {
                field.onChange(value);
                // Trigger a re-render to update the guest price indicator
                setTimeout(() => field.onChange(value), 0);
              }}
            />
            {field.value !== undefined && field.value !== null && (
              <Text type="secondary" className="mt-1 block">
                Guest Price: Php{calculateGuestPrice(field.value).toFixed(2)}{" "}
                (Traveler will see ₱
                {calculateGuestPrice(field.value).toFixed(0)})
              </Text>
            )}
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.activities`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Activities"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Select
              {...field}
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select activities"
            >
              <Option value="hiking">Hiking</Option>
              <Option value="swimming">Swimming</Option>
              <Option value="river_rafting">River Rafting</Option>
              <Option value="kayaking">Kayaking</Option>
            </Select>
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.inclusions`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Inclusions"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <TextArea {...field} rows={4} />
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.itinerary`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Itinerary"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <TextArea {...field} rows={4} />
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.exclusions`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Package Exclusions"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <TextArea {...field} rows={4} />
          </Form.Item>
        )}
      />

      <Controller
        name={`packages.${index}.notes`}
        control={control}
        render={({ field }) => (
          <Form.Item label="Package Notes">
            <TextArea {...field} rows={4} />
          </Form.Item>
        )}
      />
    </div>
  );
};

const PackageDetailsSection: React.FC<PackageDetailsSectionProps> = ({
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  const items: TabsProps["items"] = fields.map((field, index) => ({
    key: field.id,
    label: field.title || `Package ${index + 1}`,
    children: <PackageForm control={control} index={index} />,
    closeIcon:
      fields.length > 1 ? (
        <CloseOutlined onClick={() => remove(index)} />
      ) : null,
  }));

  return (
    <>
      <Tabs
        type="editable-card"
        items={items}
        onEdit={(_, action) => {
          if (action === "add") {
            append({
              title: `Package ${fields.length + 1}`,
              description: "",
              duration: 1,
              price: 0,
              activities: [],
              inclusions: "",
              itinerary: "",
              exclusions: "",
              notes: "",
            });
          }
        }}
      />
    </>
  );
};

export default PackageDetailsSection;
