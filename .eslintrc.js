module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: ["tsconfig.json"],
    },
    ignorePatterns: ["*.js"],
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
    },
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        "require-atomic-updates": "warn",
        "no-console": "warn",
        "quotes": ["error", "single"],
        "unused-imports/no-unused-imports": "error",
        "no-useless-escape": "off",
        "no-duplicate-imports": "error",
        "no-tabs": ["error", { allowIndentationTabs: true }],
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-base-to-string": [
            "error",
            {
                ignoredTypeNames: ["BigNumberish"],
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-angle-bracket-type-assertion": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "interface",
                format: ["PascalCase"],
                prefix: ["I"],
            },
        ],
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    ["^aurelia", "^@aurelia"],
                    ["^(@|lib)(/.*|$)"],
                    ["^\\u0000"],
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    ["^.+\\.?(css)$"],
                ],
            },
        ],
        "object-curly-spacing": ["error", "always"],
    },
    overrides: [
        {
            files: ["./src/models/generated/**/*.ts"],
            rules: {
                "@typescript-eslint/ban-tslint-comment": "off",
                indent: ["warn", 4],
            },
        },
        {
            files: ["./src/**/*.spec.ts"],
            rules: {
                "@typescript-eslint/unbound-method": "off",
                "@typescript-eslint/ban-ts-comment": "off",
            },
        },
    ],
};
