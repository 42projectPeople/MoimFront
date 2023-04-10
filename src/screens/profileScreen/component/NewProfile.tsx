import { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {View, TextInput, } from 'react-native'

export const NewProfile: React.FC = () => {
	/* 소문자and대문자에따라오는소문자and숫자and-_and한글 1글자~12글자 */
	const NICKNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_][ㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/;
	const CONTENT_REGEX = /^[a-zA-Z][a-zA-Z0-9-_][ㄱ-ㅎㅏ-ㅣ가-힣]{1,150}$/
	/* 소문자or대문자or숫자or특문 8글자~24글자 */
	const nickNameRef = useRef();
	/* 에러 발생하면 에러로 옮겨야함 */
	const errRef = useRef();
	const [nickName, setNickName] = useState<string | undefined>('');
	const [content, setContent] = useState<string | undefined>('');
	const [imgUrl, setImagUrl] = useState<string | undefined>('');
	
	const handleOnChangeNickName = useCallback((text:string | undefined)=>(setNickName(text)),[nickName]);
	const handleOnChangeContent = useCallback((text:string | undefined)=>(setContent(text)), [content]);

	const onSaveProfileCliked = () => {
		if (nickName && content) {
			//async thunk로 보내기		
		}
		//해당 항목들 초기화
		//navigate to home screen.

	}
	return (
		<SafeAreaView>
			<TextInput value={nickName} placeholder='닉네임' onChangeText={handleOnChangeNickName}/>
			<TextInput value={content} placeholder='소개글' onChangeText={handleOnChangeContent}/>
		</SafeAreaView>
	)
}