# Charlie Vorbach's Blog ;)

This is a static Jekyll site for `charliea0.github.io`.

## Reproducible Build

The site builds with Ruby and Bundler. The expected Ruby version is pinned in
`.ruby-version`, and exact gem versions are pinned in `Gemfile.lock`.

Install the matching Bundler version:

```sh
gem install bundler:2.2.27
```

Install project dependencies:

```sh
bundle install
```

Build the static site:

```sh
bundle exec jekyll build
```

Run a local development server:

```sh
bundle exec jekyll serve
```

The generated site is written to `_site/`, which is intentionally ignored.

