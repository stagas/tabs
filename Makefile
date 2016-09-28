dev:
	@make dev-build & \
		./node_modules/.bin/live-server \
		--no-browser \
		--port=3000 \
		--wait=200 \
		--watch=dist/tabs.js,example

dev-build:
	@./node_modules/.bin/watchify \
		--plugin [ css-modulesify -o dist/tabs.css ] \
		--verbose \
		--detect-globals=false \
		--standalone Tabs \
		--node \
		--debug \
		--entry index.js \
		--outfile dist/tabs.js

install: package.json
	@npm install

.PHONY: dev dev-build
