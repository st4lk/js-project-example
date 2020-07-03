.PHONY: run, lint

SENTRY_RELEASE_NAME ?= `git rev-parse HEAD`
SENTRY_CLI ?= sentry-cli
DIST_PATH ?= dist/

all: install

install: .install
.install: package.json
	@PATH=/usr/bin/:${PATH} npm install
	touch $@

sentry-create-release:
	$(SENTRY_CLI) releases new --finalize $(SENTRY_RELEASE_NAME)

sentry-set-commits: sentry-create-release
	$(SENTRY_CLI) releases set-commits --auto $(SENTRY_RELEASE_NAME)

sentry-upload-sourcemaps: sentry-create-release
	$(SENTRY_CLI) releases files $(SENTRY_RELEASE_NAME) upload-sourcemaps $(DIST_PATH) --rewrite -i node_modules/ -i webpack.*

run: install
	SENTRY_RELEASE_NAME=$(SENTRY_RELEASE_NAME) npm run devserver

serve: build
	rm $(DIST_PATH)/assets/*.map
	cd $(DIST_PATH) && python -m SimpleHTTPServer 8080

lint: install
	npm run lint

build-dev: install
	SENTRY_RELEASE_NAME=$(SENTRY_RELEASE_NAME) npm run build-dev

build: install
	SENTRY_RELEASE_NAME=$(SENTRY_RELEASE_NAME) npm run build-prod

build-staging: install
	SENTRY_RELEASE_NAME=$(SENTRY_RELEASE_NAME) npm run build-staging

deploy: build
	make sentry-set-commits
	make sentry-upload-sourcemaps

deploy-staging: build-staging
	make sentry-set-commits
