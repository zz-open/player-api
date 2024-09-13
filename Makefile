.PHONY:	help test
help:
	@echo "usage: make <option>"
	@echo "options and effects:"
	@echo "    help                     : Show help"
	@echo "    test                     : Test ..."

test:
	@echo "正在执行单元测试用例 ..."
	#pnpm jest ./src/__test__/tecent/tecent_sign.test.js
	pnpm jest ./src/__test__/tecent/tecent_playlist_info.test.js
	
.PHONY:	push upgrade dev
push:
	@git add .
	git commit -m "脚本自动push"
	git push origin main

upgrade:
	@pnpm upgrade --latest
	@echo "upgrade success"

dev:
	@pnpm dev