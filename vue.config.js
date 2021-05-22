const path = require("path");

module.exports = {
    productionSourceMap: false, //不生成map 文件
    // 只能写vue封装的配置

    runtimeCompiler: true,
    // 关闭EsLint的规则
    lintOnSave: false,
    chainWebpack: config => {
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap(options => Object.assign(options, { limit: 30000 }));
    },
    configureWebpack: {
        // 内部写webpack原生配置
        resolve: {
            extensions: [".js", ".vue", ".json"], // 可以省略的后缀名
            alias: {
                // 路径别名(简写方式)
                // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components"),
            },
        },
    },
    devServer: {
        open: true,
        proxy: {
            // 处理以/api开头路径的请求
            "/api": {
                target: "http://localhost:8965", // 转发的目标地址
                pathRewrite: {
                    "^/api": "", // 转发请求时去除路径前面的/api
                },
                changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
            },
        },
    },
};
