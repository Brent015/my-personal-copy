import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Button,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Control, useFieldArray, Controller } from "react-hook-form";
import { EventFormData } from "./types";
import dayjs from "dayjs"; // Import dayjs for date handling

const { Option } = Select;

interface PaymentAndDiscountsSectionProps {
  control: Control<EventFormData>;
}

const PaymentAndDiscountsSection: React.FC<PaymentAndDiscountsSectionProps> = ({
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "discounts",
  });

  return (
    <>
      <Controller
        name="requiredDownPayment"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            required
            label="Required Down Payment"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <InputNumber {...field} min={0} addonBefore="₱" />
          </Form.Item>
        )}
      />

      <Controller
        name="allowFullPayment"
        control={control}
        render={({ field }) => (
          <Form.Item label="Allow Full Payment">
            <Switch {...field} checked={field.value} />
          </Form.Item>
        )}
      />

      <h3 className="text-lg font-semibold mb-4">Discounts</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-4 border border-gray-200 rounded-md"
        >
          <Controller
            name={`discounts.${index}.name`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Discount Name"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />

          <Controller
            name={`discounts.${index}.type`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Discount Type"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Select {...field}>
                  <Option value="percentage">Percentage</Option>
                  <Option value="amount">Amount</Option>
                </Select>
              </Form.Item>
            )}
          />

          <Controller
            name={`discounts.${index}.value`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Discount Value"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <InputNumber {...field} min={0} max={100} />
              </Form.Item>
            )}
          />

          <Controller
            name={`discounts.${index}.validity`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Validity (Optional)"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toDate() : null)
                  }
                />
              </Form.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => remove(index)}
            block
            icon={<MinusCircleOutlined />}
          >
            Remove Discount
          </Button>
        </div>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={() => append({ name: "", type: "percentage", value: 0 })}
          block
          icon={<PlusOutlined />}
        >
          Add Discount
        </Button>
      </Form.Item>
    </>
  );
};

export default PaymentAndDiscountsSection;
