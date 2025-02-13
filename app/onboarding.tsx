import React from "react";
import { router } from "expo-router";
import { ViewStyle, TextInput, Button, TextStyle } from "react-native";
import { Controller, useForm, SubmitErrorHandler, FieldValues } from 'react-hook-form';

import type { OnboardingForm } from "@/types/onboarding";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import FlexZoneHeader from "@/components/FlexZoneHeader";

export default function OnboardingScreen() {
    const { control, handleSubmit, formState: { errors }, register, reset } = useForm<OnboardingForm>({
        mode: 'onChange'
    });

    const onSubmit = async (data: any) => {
        console.log(data)
        router.replace("/");
    };

    const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
        return console.log(errors)
    }

    return (
        <ThemedView style={$container}>
            <FlexZoneHeader />
            <ThemedView>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText style={{ marginRight: 5 }}>I am</ThemedText>
                    <Controller
                        name="heightFeet"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={$numericInput}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(Number(text))}
                                    value={value}
                                    keyboardType="numeric"
                                    placeholder="5"
                                />
                                <ThemedText style={{ marginLeft: 5 }}>feet</ThemedText>
                            </ThemedView>
                        )}
                        rules={{
                            required: 'Height is required',
                            validate: (v) => v > 0 || 'Height must be a positive number',
                        }}
                    />

                    <Controller
                        name="heightInches"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={$numericInput}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(Number(text))}
                                    value={value}
                                    keyboardType="numeric"
                                    placeholder="11"
                                />
                                <ThemedText style={{ marginLeft: 5 }}>inches</ThemedText>
                            </ThemedView>
                        )}
                        rules={{
                            required: 'Height is required',
                            validate: (v) => v > 0 || 'Height must be a positive number',
                        }}
                    />

                    {errors.heightFeet && (
                        <ThemedText style={{ color: 'red' }}>{errors.heightFeet.message}</ThemedText>
                    )}
                </ThemedView>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText style={{ marginRight: 5 }}>I weigh</ThemedText>
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={$numericInput}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(Number(text))}
                                    value={value}
                                    keyboardType="numeric"
                                    placeholder="150"
                                />
                                <ThemedText style={{ marginLeft: 5 }}>lbs</ThemedText>
                            </ThemedView>
                        )}
                        rules={{
                            required: 'Weight is required',
                            validate: (v) => v > 0 || 'Weight must be a positive number',
                        }}
                    />
                    {errors.weight && (
                        <ThemedText style={{ color: 'red' }}>{errors.weight.message}</ThemedText>
                    )}
                </ThemedView>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText style={{ marginRight: 5 }}>I am</ThemedText>
                    <Controller
                        name="age"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={$numericInput}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(Number(text))}
                                    value={value}
                                    keyboardType="numeric"
                                    placeholder="25"
                                />
                                <ThemedText style={{ marginLeft: 5 }}>years old</ThemedText>
                            </ThemedView>
                        )}
                        rules={{
                            required: 'Age is required',
                            validate: (v) => v > 0 || 'Age must be a positive number',
                        }}
                    />
                    {errors.age && (
                        <ThemedText style={{ color: 'red' }}>{errors.age.message}</ThemedText>
                    )}
                </ThemedView>
            </ThemedView>
            <ThemedView style={$submitBtn}>
                <Button title="Submit" onPress={handleSubmit(onSubmit, onError)} />
            </ThemedView>
        </ThemedView>
    );
}

const $container: ViewStyle = {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
} as const;

const $numericInput: TextStyle = {
    height: 40,
    width: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: 'center',
} as const;

const $submitBtn: ViewStyle = {
    margin: 20,
    padding: 10,
    width: 200,
} as const;

