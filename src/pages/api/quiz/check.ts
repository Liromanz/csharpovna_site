export const prerender = false;

import type { APIRoute } from "astro";

/**
 * Проверка ответа на quiz-вопрос.
 *
 * MVP: возвращает 501 Not Implemented. Маршрут зарезервирован под будущую
 * реализацию (см. план: тесты внутри уроков с поддержкой подписки).
 */
export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      error: "Not implemented",
      message: "Проверка ответов на квизы будет добавлена вместе с подписочной моделью.",
    }),
    {
      status: 501,
      headers: { "content-type": "application/json" },
    },
  );
};
