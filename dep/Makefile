.PHONY: lint, build-dev, build, clean

all: install

install: .install
.install: package.json
	npm install
	touch $@

lint:
	npm run lint

test:
	npm run test

build-dev: clean install
	mkdir dist
	cp package.json dist/
	npm run build-dev

build: clean install
	npm run build

clean:
	rm -rf dist

