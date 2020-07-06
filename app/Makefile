.PHONY: run, lint

SENTRY_RELEASE_NAME ?= `git rev-parse HEAD`
SENTRY_CLI ?= sentry-cli
DIST_PATH ?= dist/
ENVIRONMENT ?= staging

all: install

install: .install
.install: package.json
	@PATH=/usr/bin/:${PATH} npm install
	touch $@

sentry-create-release:
	$(SENTRY_CLI) releases new --finalize $(SENTRY_RELEASE_NAME) -e $(ENVIRONMENT)

sentry-set-commits: sentry-create-release
	$(SENTRY_CLI) releases set-commits --auto $(SENTRY_RELEASE_NAME) -e $(ENVIRONMENT)

sentry-upload-sourcemaps: sentry-create-release
	$(SENTRY_CLI) releases files $(SENTRY_RELEASE_NAME) upload-sourcemaps $(DIST_PATH) --rewrite -i node_modules/ -i webpack.*

run: install
	SENTRY_RELEASE_NAME=$(SENTRY_RELEASE_NAME) npm run devserver

serve: build
	rm $(DIST_PATH)/assets/*.map
	cd $(DIST_PATH) && python -m SimpleHTTPServer 8080

serve-staging: build-staging
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
	ENVIRONMENT=production $(MAKE) sentry-set-commits
	ENVIRONMENT=production $(MAKE) sentry-upload-sourcemaps

deploy-staging: build-staging
	ENVIRONMENT=staging $(MAKE) sentry-set-commits
	ENVIRONMENT=staging $(MAKE) sentry-upload-sourcemaps  # not needed on staging, doing it for checking issue resolving
