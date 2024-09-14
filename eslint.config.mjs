import antfu from '@antfu/eslint-config'

export default antfu({
    typescript: false,
    vue: false
}, {
    ignores: [
        "./src/test/*"
    ]
})
