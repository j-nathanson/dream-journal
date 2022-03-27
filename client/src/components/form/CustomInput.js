import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

export default function CustomInput({
    control,
    name,
    rules = {},
    type = 'text',
    placeholder,
    value = '',
}) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={value}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error }
            }) => (
                <Form.Group className="mb-3">
                    <div style={{ borderColor: error ? "red" : "grey" }}>
                        <Form.Control
                            value={value}
                            type={type}
                            style={{ borderColor: error ? "red" : "grey", }}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                        />
                    </div>
                    {error && (
                        <div className="text-white mt-2">
                            {error.message || "Error"}
                        </div>
                    )}
                </Form.Group>

            )}
        />
    );
};