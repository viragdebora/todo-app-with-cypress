const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ["./tsconfig.json"],
    },
    plugins: [
        'react',
    ],
    rules: {
        "@typescript-eslint/indent": [ERROR, 4],
        "@typescript-eslint/semi": [ERROR, "always"],
        "@typescript-eslint/member-delimiter-style": [
            ERROR, {
                multiline: {
                    delimiter: "semi",
                    requireLast: true,
                },
                singleline: {
                    delimiter: "semi",
                    requireLast: true,
                },
                multilineDetection: "brackets",
            }
        ],
        "@typescript-eslint/comma-dangle": [ERROR, "always-multiline"],
        "@typescript-eslint/space-before-function-paren": [ERROR, {
            anonymous: "never",
            named: "never",
            asyncArrow: "always",
        }],
        "@typescript-eslint/return-await": [ERROR, "in-try-catch"],
        "@typescript-eslint/strict-boolean-expressions": [ERROR, {
            allowNullableObject: true,
            allowString: true,
            allowNullableString: true,
            allowAny: true,
        }],
        "@typescript-eslint/consistent-type-definitions": OFF,
        "@typescript-eslint/no-misused-promises": [
            ERROR,
            {
                checksVoidReturn: false,
            },
        ],
        "@typescript-eslint/no-floating-promises": OFF,
        "@typescript-eslint/no-confusing-void-expression": OFF,
        "react/react-in-jsx-scope": OFF,
        "@typescript-eslint/no-namespace": [ERROR, { allowDeclarations: true }],
        "@typescript-eslint/method-signature-style": OFF,
    }
}
