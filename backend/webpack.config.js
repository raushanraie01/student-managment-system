module.exports = function (options, webpack) {
  return {
    ...options,
    externals: [
      ...(options.externals || []),
      {
        'mock-aws-s3': 'mock-aws-s3',
        'aws-sdk': 'aws-sdk',
        'nock': 'nock',
      },
    ],
    module: {
      ...options.module,
      rules: [
        ...(options.module?.rules || []),
        {
          test: /\.html$/,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            '@nestjs/platform-express',
            'class-transformer',
            'class-validator',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
  };
};
