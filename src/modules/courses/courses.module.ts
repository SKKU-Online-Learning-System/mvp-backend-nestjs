import { Module } from '@nestjs/common';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CompleteModule } from './complete/complete.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
	imports: [
		BookmarkModule,
		CompleteModule,
		CourseModule,
		EnrollmentModule,
		HashtagModule,
		WishlistModule,
	],
})
export class CoursesModule {}
