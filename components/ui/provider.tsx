"use client";

import { ChakraProvider, createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps,} from "./color-mode";
import vars from "@/app/variables.module.scss";

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				orange: {
					600: {
						value: vars.orange600,
					},
				},
			},
		},
  	},
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
