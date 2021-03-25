#!/usr/bin/python
#coding=utf-8

import sys
import os
import string
import random
import re
import json

key = '_csjc'

filesIgnore = [
	'layaMaxUI.ts',
	'GameConfig.ts',
	'aes.js'
]

def isFileIgnore(path):
	for f in filesIgnore:
		if path.find(f) >= 0:
			return True
	return False

def getRandomLetter():
	return '_'+random.choice(string.letters)+random.choice(string.letters)+random.choice(string.letters)+random.choice(string.letters)

def dumpRep(reps):
	for _r in reps:
		print _r

def splitReplace(line, _var, _replace, changed = "", isReplaced = False):
	splited = line.split(_var, 1)
	if len(splited) == 1:
		changed += line
		return changed,isReplaced
	else:
		if splited[0][-1:].isalpha() or splited[0][-1:].isdigit() or splited[1][:1].isalpha() or splited[1][:1].isdigit():
			changed += splited[0] + _var
		else:
			changed += splited[0] + _replace
			isReplaced = True
		return splitReplace(splited[1], _var, _replace, changed, isReplaced)

#0:首部 1:中部 2:尾部
def findVar(line, templets, _type = None):
	if line.find(key) < 0: return
	splited = line.split(key, 1)
	if _type == None:
		_str = splited[0]
		if len(_str) == 0:
			_type = 0
		else:
			_char = _str[len(_str) - 1]
			if not _char.isalnum() and _char != '_':
				_type = 0
			else:
				_str = splited[1]
				_char = _str[0]
				if not _char.isalnum() and _char != '_':
					_type = 2
				else:
					_type = 1

	if len(splited) == 1:
		return
	else:
		_str = ""
		if _type == 0:
			cnt = 0
			_str = splited[1]
			while True:
				if cnt >= len(_str): break
				_char = _str[cnt]
				if _char.isalpha() or _char.isdigit() or _char == '_':
					cnt += 1
				else:
					var = key + _str[:cnt]
					templets.append({'var': var, 'rep': getRandomLetter()})
					break
		elif _type == 1:
			cnt = 1
			_str = splited[0]
			while True:
				if cnt >= len(_str): break
				_char = _str[len(_str) - cnt]
				if _char.isalpha() or _char.isdigit() or _char == '_':
					cnt += 1
				else:
					var = _str[len(_str) - cnt + 1:] + key
					break
			cnt = 0
			_str = splited[1]
			while True:
				if cnt >= len(_str): break
				_char = _str[cnt]
				if _char.isalpha() or _char.isdigit() or _char == '_':
					cnt += 1
				else:
					var = var + _str[:cnt]
					templets.append({'var': var, 'rep': getRandomLetter()})
					break
		elif _type == 2:
			cnt = 1
			_str = splited[0]
			while True:
				if cnt >= len(_str): break
				_char = _str[len(_str) - cnt]
				if _char.isalpha() or _char.isdigit() or _char == '_':
					cnt += 1
				else:
					var = _str[len(_str) - cnt + 1:] + key
					templets.append({'var': var, 'rep': getRandomLetter()})
					break

		findVar(_str, templets)

def uglify(_dir):
	templets = []
	filterVars = []
	blankFilters = []
	for dirpath, dirnames, filenames in os.walk(_dir):
		for filename in filenames:
			path = os.path.join(dirpath, filename)
			if isFileIgnore(path):
				continue
			createMapNode(path, templets)

	needRep = []
	for t in templets:
		if len(needRep) == 0:
			needRep.append(t)
		else:
			canInsert = True
			for v in needRep:
				if v['var'] == t['var']:
					canInsert = False
					break
			if canInsert:
				needRep.append(t)

	# print '\n\n\n\n\n\n\n\nneedRep:\n'
	dumpRep(needRep)
	writeMap2Json(needRep)
	# dumpRep(blankFilters)
	bundlefile = 'bin/js/bundle.js'
	fp = open(bundlefile, 'rb')
	lines = fp.readlines()
	fp.close()

	isReplaced = False
	for i in range(len(lines)):
		line = lines[i]
		for _r in needRep:
			_var = _r['var']
			if _var:
				(line, _isReplaced) = splitReplace(line, _var, _r['rep'])
				if not isReplaced:
					isReplaced = _isReplaced
				lines[i] = line
				
	if isReplaced:
		fp = open(bundlefile, 'wb')
		fp.writelines(lines)
		fp.close()

def createMapNode(path, templets):
	fp = open(path, 'rb')
	lines = fp.readlines()
	fp.close()

	for i in range(len(lines)):
		line = lines[i]
		findVar(line, templets)

def writeMap2Json(templets):
	_str = json.dumps(templets, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': '))
	with open('mapwords', 'wb') as dump_f:
		dump_f.write(_str)
		dump_f.close()

if __name__ == '__main__':
	if len(sys.argv) > 1:
		os.chdir(sys.argv[1])
	
	uglify('src')
