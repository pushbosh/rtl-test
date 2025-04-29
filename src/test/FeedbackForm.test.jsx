// src/test/FeedbackForm.test.jsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { FeedbackForm } from "../components/FeedbackForm";

describe("FeedbackForm", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    vi.clearAllTimers();
    render(<FeedbackForm />);
  });

  it("1. Рендерит заголовок “Обратная связь”", () => {
    expect(screen.getByText("Обратная связь")).toBeInTheDocument();
  });

  it("2. Ввод имени и сообщения сохраняет значения в полях", () => {
    const nameInput = screen.getByPlaceholderText("Ваше имя");
    const messageTextarea = screen.getByPlaceholderText("Ваше сообщение");

    fireEvent.change(nameInput, { target: { value: "Иван" } });
    fireEvent.change(messageTextarea, { target: { value: "Привет!" } });

    expect(nameInput).toHaveValue("Иван");
    expect(messageTextarea).toHaveValue("Привет!");
  });

  it("3. Отправка формы с валидными данными показывает подтверждение", () => {
    const nameInput = screen.getByPlaceholderText("Ваше имя");
    const messageTextarea = screen.getByPlaceholderText("Ваше сообщение");
    const submitButton = screen.getByRole("button", { name: "Отправить" });

    fireEvent.change(nameInput, { target: { value: "Иван" } });
    fireEvent.change(messageTextarea, { target: { value: "Привет!" } });
    fireEvent.click(submitButton);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(
      screen.getByText("Спасибо, Иван! Ваше сообщение отправлено.")
    ).toBeInTheDocument();
  });

  it("4. Не отправляется, если имя или сообщение пустые", () => {
    const nameInput = screen.getByPlaceholderText("Ваше имя");
    const messageTextarea = screen.getByPlaceholderText("Ваше сообщение");
    const submitButton = screen.getByRole("button", { name: "Отправить" });

    fireEvent.click(submitButton);
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.queryByText(/Спасибо,/)).toBeNull();

    fireEvent.change(messageTextarea, { target: { value: "Привет!" } });
    fireEvent.click(submitButton);
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.queryByText(/Спасибо,/)).toBeNull();

    fireEvent.change(messageTextarea, { target: { value: "" } });
    fireEvent.change(nameInput, { target: { value: "Иван" } });
    fireEvent.click(submitButton);
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.queryByText(/Спасибо,/)).toBeNull();
  });

  it("5. Кнопка “Отправить” существует и активна", () => {
    const submitButton = screen.getByRole("button", { name: /Отправить/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it("6. Trim-валидация: только пробелы не считаются вводом", () => {
    const nameInput = screen.getByPlaceholderText("Ваше имя");
    const messageTextarea = screen.getByPlaceholderText("Ваше сообщение");
    const submitButton = screen.getByRole("button", { name: "Отправить" });

    fireEvent.change(nameInput, { target: { value: "   " } });
    fireEvent.change(messageTextarea, { target: { value: "   " } });
    fireEvent.click(submitButton);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByText(/Спасибо,/)).toBeNull();
  });
});
