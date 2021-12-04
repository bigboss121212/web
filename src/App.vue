<template>
		<div>
			<div class="messs">
				<div v-for="message in messages" v-bind:key="message.id" class="message">
					<div v-if="message.id > 1"> {{ message.fromUser }}: {{ message.message }} </div>
					
				</div>
			</div>
			
			<div v-for="members in memberss" v-bind:key="members.id" class="member">
			    {{ members.members }}</div>
		 	
				
		</div>

</template>

<script>
	import {messageList} from './page-chat.js'
	import {memberList} from './page-chat.js'

export default {
	name: "App",
	data() {
		return {
			messages : messageList,
			memberss : memberList,
    	};
  	},
  	methods: {
		list(){
			memberss.lenght
		}  

  	},
};
</script>