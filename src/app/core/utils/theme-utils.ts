import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export function getCurrentTenantNickName(): string {
  return "default";
}
export function getCurrentTenantAssets(): string {
  // Precisa verificar aqui com um switch de qual cliente é baseado no dominio pra acessar a pasta correta
  return "default";
}

export function getCurrentColorHexByVariant(colorVariant: string = "primary") {
  const rootStyles = getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue(`--${colorVariant}-color`);
}
