import { Module } from '@nestjs/common';
import { AnswerModule } from './answer/answer.module';
import { CommentModule } from './comment/comment.module';
import { QuestionModule } from './question/question.module';

@Module({
	imports: [QuestionModule, AnswerModule, CommentModule],
})
export class QnAModule {}
