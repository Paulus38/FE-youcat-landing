import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

type Translations = {
  [key: string]: {
    en: string;
    vi: string;
  };
};

// Add all translations here
const translations: Translations = {
  appName: {
    en: 'Magisterium',
    vi: 'Giáo Lý'
  },
  home: {
    en: 'Home',
    vi: 'Trang Chủ'
  },
  quizzes: {
    en: 'Quizzes',
    vi: 'Bài Kiểm Tra'
  },
  catechism: {
    en: 'Catechism',
    vi: 'Giáo Lý'
  },
  myTrophies: {
    en: 'My Progress',
    vi: 'Tiến Độ'
  },
  login: {
    en: 'Login',
    vi: 'Đăng Nhập'
  },
  logout: {
    en: 'Logout',
    vi: 'Đăng Xuất'
  },
  joinNow: {
    en: 'Join Now',
    vi: 'Tham Gia Ngay'
  },
  about: {
    en: 'About',
    vi: 'Giới Thiệu'
  },
  contact: {
    en: 'Contact',
    vi: 'Liên Hệ'
  },
  footerText: {
    en: 'Deepen Your Faith Through Learning!',
    vi: 'Đào Sâu Đức Tin Qua Học Hỏi!'
  },
  // Hero section
  heroTitle: {
    en: 'Learn Catholic Catechism in an Engaging Way!',
    vi: 'Học Giáo Lý Công Giáo Một Cách Thú Vị!'
  },
  heroSubtitle: {
    en: 'Explore the Catholic faith through interactive quizzes, deepen your understanding of Church teachings, and grow in your spiritual journey!',
    vi: 'Khám phá đức tin Công Giáo qua các bài kiểm tra tương tác, đào sâu hiểu biết về giáo huấn của Giáo Hội, và phát triển trong hành trình thiêng liêng của bạn!'
  },
  startPlaying: {
    en: 'Start Learning!',
    vi: 'Bắt Đầu Học!'
  },
  createQuiz: {
    en: 'Create Quiz',
    vi: 'Tạo Bài Kiểm Tra'
  },
  // Features section
  featuresTitle: {
    en: 'Why Choose Our Platform',
    vi: 'Tại Sao Chọn Nền Tảng Của Chúng Tôi'
  },
  featuresSubtitle: {
    en: 'Our platform makes learning Catholic catechism engaging and accessible for everyone!',
    vi: 'Nền tảng của chúng tôi giúp việc học giáo lý Công Giáo trở nên thú vị và dễ tiếp cận cho mọi người!'
  },
  funQuizzes: {
    en: 'Interactive Learning',
    vi: 'Học Tập Tương Tác'
  },
  funQuizzesDesc: {
    en: 'Engage with Catholic teachings through interactive quizzes and comprehensive explanations!',
    vi: 'Tương tác với giáo huấn Công Giáo qua các bài kiểm tra tương tác và giải thích chi tiết!'
  },
  winTrophies: {
    en: 'Track Progress',
    vi: 'Theo Dõi Tiến Độ'
  },
  winTrophiesDesc: {
    en: 'Monitor your learning journey and celebrate your achievements as you deepen your faith!',
    vi: 'Theo dõi hành trình học tập và ăn mừng những thành tựu của bạn khi đào sâu đức tin!'
  },
  learnAndGrow: {
    en: 'Spiritual Growth',
    vi: 'Phát Triển Tâm Linh'
  },
  learnAndGrowDesc: {
    en: 'Enhance your understanding of Catholic teachings while strengthening your faith!',
    vi: 'Nâng cao hiểu biết về giáo huấn Công Giáo trong khi củng cố đức tin của bạn!'
  },
  // CTA section
  readyToStart: {
    en: 'Ready to Deepen Your Faith?',
    vi: 'Sẵn Sàng Đào Sâu Đức Tin?'
  },
  joinThousands: {
    en: 'Join thousands of Catholics learning and growing in their faith journey!',
    vi: 'Tham gia cùng hàng ngàn người Công Giáo đang học hỏi và phát triển trong hành trình đức tin!'
  },
  startPlayingNow: {
    en: 'Start Learning Now!',
    vi: 'Bắt Đầu Học Ngay!'
  },
  // Language switcher
  languageEn: {
    en: 'English',
    vi: 'Tiếng Anh'
  },
  languageVi: {
    en: 'Vietnamese',
    vi: 'Tiếng Việt'
  },
  // Login page
  signIn: {
    en: 'Sign In',
    vi: 'Đăng Nhập'
  },
  welcomeBack: {
    en: 'Welcome back! Please enter your details to access your account.',
    vi: 'Chào mừng trở lại! Vui lòng nhập thông tin để truy cập tài khoản của bạn.'
  },
  emailRequired: {
    en: 'Email is required',
    vi: 'Email là bắt buộc'
  },
  invalidEmail: {
    en: 'Invalid email address',
    vi: 'Địa chỉ email không hợp lệ'
  },
  emailAddress: {
    en: 'Email Address',
    vi: 'Địa Chỉ Email'
  },
  passwordRequired: {
    en: 'Password is required',
    vi: 'Mật khẩu là bắt buộc'
  },
  passwordMinLength: {
    en: 'Password must be at least 6 characters',
    vi: 'Mật khẩu phải có ít nhất 6 ký tự'
  },
  password: {
    en: 'Password',
    vi: 'Mật Khẩu'
  },
  forgotPassword: {
    en: 'Forgot password?',
    vi: 'Quên mật khẩu?'
  },
  signingIn: {
    en: 'Signing in...',
    vi: 'Đang đăng nhập...'
  },
  or: {
    en: 'OR',
    vi: 'HOẶC'
  },
  signInWithGoogle: {
    en: 'Sign in with Google',
    vi: 'Đăng nhập với Google'
  },
  noAccount: {
    en: "Don't have an account?",
    vi: 'Chưa có tài khoản?'
  },
  signUp: {
    en: 'Sign Up',
    vi: 'Đăng Ký'
  },
  invalidCredentials: {
    en: 'Invalid email or password. Please try again.',
    vi: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
  },
  googleLoginFailed: {
    en: 'Google login failed. Please try again.',
    vi: 'Đăng nhập Google thất bại. Vui lòng thử lại.'
  },
  // Top Players section
  topPlayers: {
    en: 'Top Players',
    vi: 'Người Chơi Hàng Đầu'
  },
  topPlayersSubtitle: {
    en: 'See who is leading the way in learning Catholic catechism!',
    vi: 'Xem ai đang dẫn đầu trong việc học giáo lý Công Giáo!'
  },
  // Sample Questions section
  sampleQuestions: {
    en: 'Random Questions',
    vi: 'Câu Hỏi Ngẫu Nhiên'
  },
  exploreQuestions: {
    en: 'Explore some random questions from our extensive catechism collection',
    vi: 'Khám phá một số câu hỏi ngẫu nhiên từ bộ sưu tập giáo lý phong phú của chúng tôi'
  },
  takeQuiz: {
    en: 'Take Quiz',
    vi: 'Làm Bài Kiểm Tra'
  },
  moreQuestions: {
    en: 'More Questions',
    vi: 'Thêm Câu Hỏi'
  },
  exploreAllQuestions: {
    en: 'Explore All Questions',
    vi: 'Khám Phá Tất Cả Câu Hỏi'
  },
  rank: {
    en: 'Rank',
    vi: 'Xếp Hạng'
  },
  player: {
    en: 'Player',
    vi: 'Người Chơi'
  },
  points: {
    en: 'Points',
    vi: 'Điểm'
  },
  level: {
    en: 'Level',
    vi: 'Cấp Độ'
  },
  // Profile page
  profileInfo: {
    en: 'Profile Info',
    vi: 'Thông Tin Cá Nhân'
  },
  activityHistory: {
    en: 'Activity History',
    vi: 'Lịch Sử Hoạt Động'
  },
  achievements: {
    en: 'Achievements',
    vi: 'Thành Tựu'
  },
  settings: {
    en: 'Settings',
    vi: 'Cài Đặt'
  },
  personalInformation: {
    en: 'Personal Information',
    vi: 'Thông Tin Cá Nhân'
  },
  fullName: {
    en: 'Full Name',
    vi: 'Họ và Tên'
  },
  username: {
    en: 'Username',
    vi: 'Tên Đăng Nhập'
  },
  email: {
    en: 'Email',
    vi: 'Email'
  },
  memberSince: {
    en: 'Member Since',
    vi: 'Thành Viên Từ'
  },
  statistics: {
    en: 'Statistics',
    vi: 'Thống Kê'
  },
  quizzesCompleted: {
    en: 'Quizzes',
    vi: 'Bài Kiểm Tra'
  },
  averageScore: {
    en: 'Avg. Score',
    vi: 'Điểm TB'
  },
  totalPoints: {
    en: 'Points',
    vi: 'Điểm'
  },
  editProfile: {
    en: 'Edit Profile',
    vi: 'Chỉnh Sửa Hồ Sơ'
  },
  accountActions: {
    en: 'Account Actions',
    vi: 'Thao Tác Tài Khoản'
  },
  changePassword: {
    en: 'Change Password',
    vi: 'Đổi Mật Khẩu'
  },
  changePasswordDescription: {
    en: 'Update your password for better security',
    vi: 'Cập nhật mật khẩu để bảo mật tốt hơn'
  },
  deleteAccount: {
    en: 'Delete Account',
    vi: 'Xóa Tài Khoản'
  },
  deleteAccountWarning: {
    en: 'This action cannot be undone',
    vi: 'Hành động này không thể hoàn tác'
  },
  recentActivity: {
    en: 'Recent Activity',
    vi: 'Hoạt Động Gần Đây'
  },
  noRecentActivity: {
    en: 'No recent activity',
    vi: 'Không có hoạt động gần đây'
  },
  viewAllHistory: {
    en: 'View All History',
    vi: 'Xem Tất Cả Lịch Sử'
  },
  score: {
    en: 'Score',
    vi: 'Điểm'
  },
  completedOn: {
    en: 'Completed on',
    vi: 'Hoàn thành vào'
  },
  yourAchievements: {
    en: 'Your Achievements',
    vi: 'Thành Tựu Của Bạn'
  },
  noAchievementsYet: {
    en: 'No achievements yet',
    vi: 'Chưa có thành tựu nào'
  },
  startTakingQuizzes: {
    en: 'Start Taking Quizzes',
    vi: 'Bắt Đầu Làm Bài Kiểm Tra'
  },
  earnMoreAchievements: {
    en: 'Earn More Achievements',
    vi: 'Đạt Thêm Thành Tựu'
  },
  accountSettings: {
    en: 'Account Settings',
    vi: 'Cài Đặt Tài Khoản'
  },
  settingsComingSoon: {
    en: 'Settings coming soon',
    vi: 'Cài đặt sẽ sớm ra mắt'
  },
  leaderboard: {
    en: 'Leaderboard',
    vi: 'Bảng Xếp Hạng'
  },
  leaderboardSubtitle: {
    en: 'Top performers in Youcat quizzes',
    vi: 'Những người dùng có thành tích cao nhất trong các bài kiểm tra Youcat'
  },
  name: {
    en: 'Name',
    vi: 'Tên'
  },
  totalScore: {
    en: 'Total Score',
    vi: 'Tổng Điểm'
  },
  quizzesTaken: {
    en: 'Quizzes Taken',
    vi: 'Số Bài Đã Làm'
  },
  loadingLeaderboard: {
    en: 'Loading leaderboard data...',
    vi: 'Đang tải dữ liệu bảng xếp hạng...'
  },
  leaderboardError: {
    en: 'Failed to fetch leaderboard data',
    vi: 'Không thể tải dữ liệu bảng xếp hạng'
  },
  allRightsReserved: {
    en: 'All Rights Reserved',
    vi: 'Tất Cả Quyền Được Bảo Lưu'
  },
  terms: {
    en: 'Terms',
    vi: 'Điều Khoản'
  },
  privacy: {
    en: 'Privacy',
    vi: 'Quyền Riêng Tư'
  },
  profile: {
    en: 'Profile',
    vi: 'Hồ Sơ'
  },
  
  // Profile update features
  selectAvatar: {
    en: 'Select Avatar',
    vi: 'Chọn Ảnh Đại Diện'
  },
  usernameCannotBeChanged: {
    en: 'Username cannot be changed',
    vi: 'Tên đăng nhập không thể thay đổi'
  },
  cancel: {
    en: 'Cancel',
    vi: 'Hủy'
  },
  saveChanges: {
    en: 'Save Changes',
    vi: 'Lưu Thay Đổi'
  },
  saving: {
    en: 'Saving...',
    vi: 'Đang lưu...'
  },
  avatarUpdateSuccess: {
    en: 'Avatar updated successfully',
    vi: 'Cập nhật ảnh đại diện thành công'
  },
  avatarUpdateError: {
    en: 'Failed to update avatar',
    vi: 'Cập nhật ảnh đại diện thất bại'
  },
  profileUpdateSuccess: {
    en: 'Profile updated successfully',
    vi: 'Cập nhật hồ sơ thành công'
  },
  profileUpdateError: {
    en: 'Failed to update profile',
    vi: 'Cập nhật hồ sơ thất bại'
  },
  // Create Exam page
  createYourPracticeTest: {
    en: 'Create Your Practice Test',
    vi: 'Tạo Bài Kiểm Tra Của Bạn'
  },
  customizeYourQuiz: {
    en: 'Customize your YOUCAT quiz to focus on specific categories and difficulty levels',
    vi: 'Tùy chỉnh bài kiểm tra YOUCAT của bạn để tập trung vào các danh mục và mức độ khó cụ thể'
  },
  examSettings: {
    en: 'Exam Settings',
    vi: 'Thiết Lập Bài Kiểm Tra'
  },
  reviewConfirm: {
    en: 'Review & Confirm',
    vi: 'Xem Lại & Xác Nhận'
  },
  testTitle: {
    en: 'Test Title',
    vi: 'Tiêu Đề Bài Kiểm Tra'
  },
  categories: {
    en: 'Categories',
    vi: 'Danh Mục'
  },
  generalCatechism: {
    en: 'General Catechism',
    vi: 'Giáo Lý Chung'
  },
  theCreed: {
    en: 'The Creed',
    vi: 'Kinh Tin Kính'
  },
  theSacraments: {
    en: 'The Sacraments',
    vi: 'Các Bí Tích'
  },
  tenCommandments: {
    en: 'The Ten Commandments',
    vi: 'Mười Điều Răn'
  },
  prayerSpirituality: {
    en: 'Prayer & Spirituality',
    vi: 'Cầu Nguyện & Tâm Linh'
  },
  churchHistory: {
    en: 'Church History',
    vi: 'Lịch Sử Giáo Hội'
  },
  socialTeachings: {
    en: 'Social Teachings',
    vi: 'Giáo Huấn Xã Hội'
  },
  difficultyLevel: {
    en: 'Difficulty Level',
    vi: 'Mức Độ Khó'
  },
  easy: {
    en: 'Easy',
    vi: 'Dễ'
  },
  medium: {
    en: 'Medium',
    vi: 'Trung bình'
  },
  hard: {
    en: 'Hard',
    vi: 'Khó'
  },
  mixed: {
    en: 'Mixed',
    vi: 'Hỗn Hợp'
  },
  randomizeQuestionOrder: {
    en: 'Randomize Question Order',
    vi: 'Sắp Xếp Câu Hỏi Ngẫu Nhiên'
  },
  numberOfQuestions: {
    en: 'Number of Questions',
    vi: 'Số Lượng Câu Hỏi'
  },
  timePerQuestion: {
    en: 'Time per Question (minutes)',
    vi: 'Thời Gian Cho Mỗi Câu Hỏi (phút)'
  },
  minutesLabel: {
    en: 'minutes',
    vi: 'phút'
  },
  backButton: {
    en: 'Back',
    vi: 'Quay Lại'
  },
  continueButton: {
    en: 'Continue',
    vi: 'Tiếp Tục'
  },
  startTestButton: {
    en: 'Start Test',
    vi: 'Bắt Đầu Kiểm Tra'
  },
  reviewTestSettings: {
    en: 'Review Test Settings',
    vi: 'Xem Lại Thiết Lập Kiểm Tra'
  },
  timeLimit: {
    en: 'Time Limit',
    vi: 'Giới Hạn Thời Gian'
  },
  timerWarning: {
    en: 'The timer will start as soon as you begin the test. Make sure you have enough time to complete it.',
    vi: 'Đồng hồ sẽ bắt đầu ngay khi bạn bắt đầu bài kiểm tra. Hãy đảm bảo bạn có đủ thời gian để hoàn thành nó.'
  },
  createYourPracticeTestHeading: {
    en: 'Create Your Practice Test',
    vi: 'Tạo Bài Kiểm Tra Thực Hành'
  },
  customizeYourQuizSubheading: {
    en: 'Customize your quiz by selecting categories, difficulty, and number of questions',
    vi: 'Tùy chỉnh bài kiểm tra của bạn bằng cách chọn danh mục, độ khó và số lượng câu hỏi'
  },
  createExamGuestMessage: {
    en: 'You are creating this exam as a guest. Your results will not be saved to track your progress.',
    vi: 'Bạn đang tạo bài kiểm tra này với tư cách khách. Kết quả của bạn sẽ không được lưu để theo dõi tiến độ.'
  },
  createExamGuest: {
    en: 'You are creating this exam as a guest. Your results will not be saved.',
    vi: 'Bạn đang tạo bài kiểm tra này với tư cách là khách. Kết quả của bạn sẽ không được lưu lại.'
  },
  examTypeStep: {
    en: 'Exam Type',
    vi: 'Loại Bài Kiểm Tra'
  },
  examSettingsStep: {
    en: 'Exam Settings',
    vi: 'Thiết Lập Bài Kiểm Tra'
  },
  reviewConfirmStep: {
    en: 'Review & Confirm',
    vi: 'Xem Lại & Xác Nhận'
  },
  chooseExamTypeHeading: {
    en: 'Choose Exam Type',
    vi: 'Chọn Loại Bài Kiểm Tra'
  },
  predefinedExamOption: {
    en: 'Predefined Exam',
    vi: 'Bài Kiểm Tra Có Sẵn'
  },
  predefinedExamDesc: {
    en: 'Select from a list of pre-created exams with specific topics and difficulty levels',
    vi: 'Chọn từ danh sách các bài kiểm tra được tạo sẵn với các chủ đề và mức độ khó cụ thể'
  },
  customExamOption: {
    en: 'Custom Exam',
    vi: 'Bài Kiểm Tra Tùy Chỉnh'
  },
  customExamDesc: {
    en: 'Create your own exam by selecting categories, difficulty, and other settings',
    vi: 'Tạo bài kiểm tra của riêng bạn bằng cách chọn danh mục, mức độ khó và các thiết lập khác'
  },
  availableExamsHeading: {
    en: 'Available Exams',
    vi: 'Các Bài Kiểm Tra Có Sẵn'
  },
  noPredefinedExams: {
    en: 'No predefined exams available at the moment.',
    vi: 'Không có bài kiểm tra được tạo sẵn vào lúc này.'
  },
  questionsLabel: {
    en: 'questions',
    vi: 'câu hỏi'
  },
  allCategories: {
    en: 'All Categories',
    vi: 'Tất Cả Danh Mục'
  },
  examTitle: {
    en: 'Exam',
    vi: 'Bài Kiểm Tra'
  },
  pleaseSelectExamError: {
    en: 'Please select a predefined exam to continue.',
    vi: 'Vui lòng chọn một bài kiểm tra có sẵn để tiếp tục.'
  },
  pleaseEnterTitleError: {
    en: 'Please enter a title for your exam.',
    vi: 'Vui lòng nhập tiêu đề cho bài kiểm tra của bạn.'
  },
  pleaseSelectCategoryError: {
    en: 'Please select at least one category.',
    vi: 'Vui lòng chọn ít nhất một danh mục.'
  },
  failedToFetchExamsError: {
    en: 'Failed to fetch predefined exams. Please try again.',
    vi: 'Không thể tải các bài kiểm tra có sẵn. Vui lòng thử lại.'
  },
  failedToCreateExamError: {
    en: 'Failed to create exam. Please try again.',
    vi: 'Không thể tạo bài kiểm tra. Vui lòng thử lại.'
  },
  seekGod: {
    en: 'Seek God, and you will find the meaning of life.',
    vi: 'Hãy tìm Chúa, bạn sẽ tìm thấy ý nghĩa cuộc đời.'
  },
  // Exam Result Page
  examResults: {
    en: 'Exam Results',
    vi: 'Kết Quả Bài Kiểm Tra'
  },
  yourScore: {
    en: 'Your Score',
    vi: 'Điểm Số Của Bạn'
  },
  correctAnswers: {
    en: 'Correct Answers',
    vi: 'Câu Trả Lời Đúng'
  },
  performance: {
    en: 'Performance',
    vi: 'Hiệu Suất'
  },
  totalQuestions: {
    en: 'Total Questions',
    vi: 'Tổng Số Câu Hỏi'
  },
  timeSpent: {
    en: 'Time Spent',
    vi: 'Thời Gian Làm Bài'
  },
  reviewAnswers: {
    en: 'Review Your Answers',
    vi: 'Xem Lại Câu Trả Lời'
  },
  questionOf: {
    en: 'Question {current} of {total}',
    vi: 'Câu Hỏi {current} trên {total}'
  },
  correct: {
    en: 'Correct',
    vi: 'Đúng'
  },
  incorrect: {
    en: 'Incorrect',
    vi: 'Sai'
  },
  previous: {
    en: 'Previous',
    vi: 'Trước'
  },
  next: {
    en: 'Next',
    vi: 'Tiếp'
  },
  shareResults: {
    en: 'Share Results',
    vi: 'Chia Sẻ Kết Quả'
  },
  takeAnotherQuiz: {
    en: 'Take Another Quiz',
    vi: 'Làm Bài Kiểm Tra Khác'
  },
  signInToSave: {
    en: 'Sign in to save your results and track your progress over time.',
    vi: 'Đăng nhập để lưu kết quả và theo dõi tiến độ của bạn theo thời gian.'
  },
  excellent: {
    en: 'Excellent',
    vi: 'Xuất Sắc'
  },
  good: {
    en: 'Good',
    vi: 'Tốt'
  },
  average: {
    en: 'Average',
    vi: 'Trung Bình'
  },
  needsImprovement: {
    en: 'Needs Improvement',
    vi: 'Cần Cải Thiện'
  },
  // Achievement-related translations
  firstSteps: {
    en: 'First Steps',
    vi: 'Bước Đầu Tiên'
  },
  firstStepsDesc: {
    en: 'Complete your first quiz with at least 70% score',
    vi: 'Hoàn thành bài kiểm tra đầu tiên với ít nhất 70% điểm số'
  },
  perfectScore: {
    en: 'Perfect Score',
    vi: 'Điểm Số Hoàn Hảo'
  },
  perfectScoreDesc: {
    en: 'Complete any quiz with 100% accuracy',
    vi: 'Hoàn thành bất kỳ bài kiểm tra nào với độ chính xác 100%'
  },
  quickLearner: {
    en: 'Quick Learner',
    vi: 'Người Học Nhanh'
  },
  quickLearnerDesc: {
    en: 'Complete 5 different quizzes',
    vi: 'Hoàn thành 5 bài kiểm tra khác nhau'
  },
  dedicatedStudent: {
    en: 'Dedicated Student',
    vi: 'Học Viên Chuyên Cần'
  },
  dedicatedStudentDesc: {
    en: 'Log in every day for a week',
    vi: 'Đăng nhập mỗi ngày trong một tuần'
  },
  daysCompleted: {
    en: '{current}/{total} days completed',
    vi: 'Đã hoàn thành {current}/{total} ngày'
  },
  notEarnedYet: {
    en: 'Not earned yet',
    vi: 'Chưa đạt được'
  },
  retakeQuiz: {
    en: 'Retake Quiz',
    vi: 'Làm Lại Bài Kiểm Tra'
  },
  finalScore: {
    en: 'Final Score',
    vi: 'Điểm Số Cuối Cùng'
  },
  incorrectAnswers: {
    en: 'Incorrect Answers',
    vi: 'Câu Trả Lời Sai'
  },
  quizSummary: {
    en: 'Quiz Summary',
    vi: 'Tổng Quan Bài Làm'
  },
  yourAnswer: {
    en: 'Your Answer',
    vi: 'Câu Trả Lời Của Bạn'
  },
  noAnswer: {
    en: 'No Answer',
    vi: 'Không Có Câu Trả Lời'
  },
  detailedResultsNotAvailable: {
    en: 'Detailed results not available',
    vi: 'Kết quả chi tiết không có sẵn'
  },
  quizResult: {
    en: 'Quiz Result',
    vi: 'Kết Quả Bài Làm'
  },
  close: {
    en: 'Close',
    vi: 'Đóng'
  },
  // About page
  aboutTitle: {
    en: 'About Youcat',
    vi: 'Giới Thiệu Về Youcat'
  },
  ourMission: {
    en: 'Our Mission',
    vi: 'Sứ Mệnh Của Chúng Tôi'
  },
  ourMissionText: {
    en: 'The Youcat Quiz platform aims to make learning the Catholic faith engaging, accessible, and enjoyable for young people around the world. Through interactive quizzes and competitions, we help users deepen their understanding of the Catholic catechism.',
    vi: 'Nền tảng Youcat Quiz nhằm mục đích giúp việc học đức tin Công Giáo trở nên hấp dẫn, dễ tiếp cận và thú vị cho người trẻ trên toàn thế giới. Thông qua các bài kiểm tra tương tác và các cuộc thi, chúng tôi giúp người dùng hiểu sâu hơn về giáo lý Công Giáo.'
  },
  whatIsYoucat: {
    en: 'What is YOUCAT?',
    vi: 'YOUCAT Là Gì?'
  },
  whatIsYoucatText: {
    en: 'YOUCAT stands for Youth Catechism of the Catholic Church. It\'s a catechism adapted for young people, presented in a question-and-answer format that makes the Catholic faith more accessible and engaging for the younger generation.',
    vi: 'YOUCAT là viết tắt của Youth Catechism of the Catholic Church (Giáo Lý Công Giáo Cho Người Trẻ). Đây là một bộ giáo lý được điều chỉnh cho người trẻ, được trình bày dưới dạng hỏi đáp giúp đức tin Công Giáo trở nên dễ tiếp cận và hấp dẫn hơn đối với thế hệ trẻ.'
  },
  ourTeam: {
    en: 'Our Team',
    vi: 'Đội Ngũ Của Chúng Tôi'
  },
  ourTeamText: {
    en: 'Our platform was developed by a team of passionate Catholics and developers who believe in the power of technology to spread knowledge and deepen faith. We collaborate with religious educators and youth ministers to ensure our content is accurate, relevant, and engaging.',
    vi: 'Nền tảng của chúng tôi được phát triển bởi một đội ngũ những người Công Giáo và các nhà phát triển nhiệt huyết, những người tin vào sức mạnh của công nghệ trong việc lan truyền kiến thức và đào sâu đức tin. Chúng tôi hợp tác với các nhà giáo dục tôn giáo và những người làm mục vụ giới trẻ để đảm bảo nội dung của chúng tôi chính xác, phù hợp và hấp dẫn.'
  },
  joinUs: {
    en: 'Join Us',
    vi: 'Tham Gia Cùng Chúng Tôi'
  },
  joinUsText: {
    en: 'Whether you\'re a catechist, a student, or someone curious about the Catholic faith, we invite you to join our community. Take quizzes, challenge your friends, and grow in your understanding of the faith in a fun and interactive way.',
    vi: 'Dù bạn là giáo lý viên, học sinh, hay người tò mò về đức tin Công Giáo, chúng tôi mời bạn tham gia cộng đồng của chúng tôi. Làm bài kiểm tra, thách thức bạn bè và phát triển hiểu biết về đức tin theo cách vui vẻ và tương tác.'
  },

  // Contact page
  contactUs: {
    en: 'Contact Us',
    vi: 'Liên Hệ Với Chúng Tôi'
  },
  contactSubtitle: {
    en: 'We\'d love to hear from you. Please get in touch with us using the form below.',
    vi: 'Chúng tôi rất mong được nghe từ bạn. Vui lòng liên hệ với chúng tôi bằng biểu mẫu dưới đây.'
  },
  getInTouch: {
    en: 'Get In Touch',
    vi: 'Liên Lạc'
  },
  getInTouchText: {
    en: 'If you have any questions about our platform, feedback, or suggestions, please don\'t hesitate to contact us. We value your input and are here to help.',
    vi: 'Nếu bạn có bất kỳ câu hỏi nào về nền tảng của chúng tôi, phản hồi hoặc đề xuất, vui lòng liên hệ với chúng tôi. Chúng tôi đánh giá cao ý kiến đóng góp của bạn và luôn sẵn sàng hỗ trợ.'
  },
  yourName: {
    en: 'Your Name',
    vi: 'Tên Của Bạn'
  },
  subject: {
    en: 'Subject',
    vi: 'Chủ Đề'
  },
  message: {
    en: 'Message',
    vi: 'Tin Nhắn'
  },
  sendMessage: {
    en: 'Send Message',
    vi: 'Gửi Tin Nhắn'
  },

  // Terms of Service page
  termsOfService: {
    en: 'Terms of Service',
    vi: 'Điều Khoản Dịch Vụ'
  },
  introduction: {
    en: '1. Introduction',
    vi: '1. Giới Thiệu'
  },
  introductionText: {
    en: 'Welcome to Youcat Quiz. By accessing and using our platform, you agree to be bound by these Terms of Service. Please read them carefully.',
    vi: 'Chào mừng đến với Youcat Quiz. Bằng cách truy cập và sử dụng nền tảng của chúng tôi, bạn đồng ý tuân theo các Điều Khoản Dịch Vụ này. Vui lòng đọc kỹ.'
  },
  userAccounts: {
    en: '2. User Accounts',
    vi: '2. Tài Khoản Người Dùng'
  },
  userAccountsText: {
    en: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.',
    vi: 'Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật mọi lúc. Không làm như vậy cấu thành vi phạm Điều Khoản, có thể dẫn đến việc chấm dứt tài khoản của bạn ngay lập tức.'
  },
  intellectualProperty: {
    en: '3. Intellectual Property',
    vi: '3. Quyền Sở Hữu Trí Tuệ'
  },
  intellectualPropertyText: {
    en: 'The content, design, and functionality of the Youcat Quiz platform, including but not limited to text, graphics, logos, and software, are owned by or licensed to us and are protected by copyright, trademark, and other intellectual property laws.',
    vi: 'Nội dung, thiết kế và chức năng của nền tảng Youcat Quiz, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo và phần mềm, thuộc sở hữu hoặc được cấp phép cho chúng tôi và được bảo vệ bởi luật bản quyền, thương hiệu và các luật sở hữu trí tuệ khác.'
  },
  userContent: {
    en: '4. User Content',
    vi: '4. Nội Dung Người Dùng'
  },
  userContentText: {
    en: 'Users may post, upload, or submit content to our platform. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with the platform.',
    vi: 'Người dùng có thể đăng, tải lên hoặc gửi nội dung lên nền tảng của chúng tôi. Bằng cách gửi nội dung, bạn cấp cho chúng tôi giấy phép toàn cầu, không độc quyền, miễn phí bản quyền để sử dụng, sao chép, sửa đổi và hiển thị nội dung đó liên quan đến nền tảng.'
  },
  prohibitedActivities: {
    en: '5. Prohibited Activities',
    vi: '5. Các Hoạt Động Bị Cấm'
  },
  prohibitedActivitiesText: {
    en: 'You agree not to engage in any activity that may interfere with or disrupt the services or servers connected to our platform. You also agree not to attempt to gain unauthorized access to any part of the platform or other accounts, computer systems, or networks.',
    vi: 'Bạn đồng ý không tham gia vào bất kỳ hoạt động nào có thể can thiệp hoặc làm gián đoạn các dịch vụ hoặc máy chủ kết nối với nền tảng của chúng tôi. Bạn cũng đồng ý không cố gắng truy cập trái phép vào bất kỳ phần nào của nền tảng hoặc các tài khoản, hệ thống máy tính hoặc mạng khác.'
  },
  termination: {
    en: '6. Termination',
    vi: '6. Chấm Dứt'
  },
  terminationText: {
    en: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
    vi: 'Chúng tôi có thể chấm dứt hoặc đình chỉ tài khoản của bạn ngay lập tức, mà không cần thông báo trước hoặc trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm nhưng không giới hạn nếu bạn vi phạm Điều Khoản.'
  },
  changesToTerms: {
    en: '7. Changes to Terms',
    vi: '7. Thay Đổi Điều Khoản'
  },
  changesToTermsText: {
    en: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check our Terms periodically for changes.',
    vi: 'Chúng tôi bảo lưu quyền, theo quyết định riêng của mình, để sửa đổi hoặc thay thế các Điều Khoản này bất cứ lúc nào. Trách nhiệm của bạn là kiểm tra định kỳ Điều Khoản của chúng tôi để biết các thay đổi.'
  },
  contactUsTerms: {
    en: '8. Contact Us',
    vi: '8. Liên Hệ Với Chúng Tôi'
  },
  contactUsTermsText: {
    en: 'If you have any questions about these Terms, please contact us at tongdoit1010@gmail.com.',
    vi: 'Nếu bạn có bất kỳ câu hỏi nào về các Điều Khoản này, vui lòng liên hệ với chúng tôi tại tongdoit1010@gmail.com.'
  },
  lastUpdated: {
    en: 'Last updated: April 2025',
    vi: 'Cập nhật lần cuối: Tháng 4 năm 2025'
  },

  // Privacy Policy page
  privacyPolicy: {
    en: 'Privacy Policy',
    vi: 'Chính Sách Quyền Riêng Tư'
  },
  privacyIntroduction: {
    en: '1. Introduction',
    vi: '1. Giới Thiệu'
  },
  privacyIntroductionText: {
    en: 'At Youcat Quiz, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.',
    vi: 'Tại Youcat Quiz, chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu cá nhân của bạn. Chính Sách Quyền Riêng Tư này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng nền tảng của chúng tôi.'
  },
  informationWeCollect: {
    en: '2. Information We Collect',
    vi: '2. Thông Tin Chúng Tôi Thu Thập'
  },
  informationWeCollectText: {
    en: 'We may collect personal information that you provide directly to us, such as when you create an account (name, email address), complete your profile (age, location), or participate in quizzes (answers, scores). We also collect certain information automatically when you use our platform, including usage data and device information.',
    vi: 'Chúng tôi có thể thu thập thông tin cá nhân mà bạn cung cấp trực tiếp cho chúng tôi, chẳng hạn như khi bạn tạo tài khoản (tên, địa chỉ email), hoàn thành hồ sơ của bạn (tuổi, vị trí) hoặc tham gia các bài kiểm tra (câu trả lời, điểm số). Chúng tôi cũng tự động thu thập một số thông tin nhất định khi bạn sử dụng nền tảng của chúng tôi, bao gồm dữ liệu sử dụng và thông tin thiết bị.'
  },
  howWeUseInfo: {
    en: '3. How We Use Your Information',
    vi: '3. Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn'
  },
  howWeUseInfoText: {
    en: 'We use the information we collect to provide, maintain, and improve our platform; to process your requests and transactions; to personalize your experience; to communicate with you; and to analyze usage patterns to enhance our services.',
    vi: 'Chúng tôi sử dụng thông tin thu thập để cung cấp, duy trì và cải thiện nền tảng của chúng tôi; để xử lý yêu cầu và giao dịch của bạn; để cá nhân hóa trải nghiệm của bạn; để liên lạc với bạn; và để phân tích mẫu sử dụng nhằm nâng cao dịch vụ của chúng tôi.'
  },
  sharingInfo: {
    en: '4. Sharing Your Information',
    vi: '4. Chia Sẻ Thông Tin Của Bạn'
  },
  sharingInfoText: {
    en: 'We do not sell your personal information to third parties. We may share your information with service providers who perform services on our behalf, when required by law, or in connection with a merger, acquisition, or asset sale.',
    vi: 'Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi có thể chia sẻ thông tin của bạn với các nhà cung cấp dịch vụ thực hiện dịch vụ thay mặt chúng tôi, khi luật pháp yêu cầu, hoặc liên quan đến việc sáp nhập, mua lại hoặc bán tài sản.'
  },
  dataSecurity: {
    en: '5. Data Security',
    vi: '5. Bảo Mật Dữ Liệu'
  },
  dataSecurityText: {
    en: 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.',
    vi: 'Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức thích hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập, tiết lộ, thay đổi và phá hủy trái phép. Tuy nhiên, không có phương thức truyền tải qua Internet hoặc lưu trữ điện tử nào an toàn 100%.'
  },
  yourRights: {
    en: '6. Your Rights',
    vi: '6. Quyền Của Bạn'
  },
  yourRightsText: {
    en: 'Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, delete, or restrict processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy.',
    vi: 'Tùy thuộc vào vị trí của bạn, bạn có thể có quyền đối với thông tin cá nhân của mình, chẳng hạn như quyền truy cập, sửa đổi, xóa hoặc hạn chế xử lý dữ liệu của bạn. Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi bằng thông tin được cung cấp ở cuối chính sách này.'
  },
  childrenPrivacy: {
    en: '7. Children\'s Privacy',
    vi: '7. Quyền Riêng Tư Của Trẻ Em'
  },
  childrenPrivacyText: {
    en: 'Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.',
    vi: 'Nền tảng của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn là phụ huynh hoặc người giám hộ và tin rằng con bạn đã cung cấp cho chúng tôi thông tin cá nhân, vui lòng liên hệ với chúng tôi.'
  },
  policyChanges: {
    en: '8. Changes to This Policy',
    vi: '8. Thay Đổi Đối Với Chính Sách Này'
  },
  policyChangesText: {
    en: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
    vi: 'Chúng tôi có thể cập nhật Chính Sách Quyền Riêng Tư này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng Chính Sách Quyền Riêng Tư mới trên trang này và cập nhật ngày "Cập nhật lần cuối".'
  },
  contactUsPrivacy: {
    en: '9. Contact Us',
    vi: '9. Liên Hệ Với Chúng Tôi'
  },
  contactUsPrivacyText: {
    en: 'If you have any questions about this Privacy Policy, please contact us at tongdoit1010@gmail.com.',
    vi: 'Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Quyền Riêng Tư này, vui lòng liên hệ với chúng tôi tại tongdoit1010@gmail.com.'
  },
  
  // Single Question Quiz
  singleQuestion: {
    en: 'Single Question Quiz',
    vi: 'Câu Hỏi Trắc Nghiệm Đơn'
  },
  singleQuestionDescription: {
    en: 'Test your knowledge with this question. Choose the correct answer!',
    vi: 'Kiểm tra kiến thức của bạn với câu hỏi này. Chọn câu trả lời đúng!'
  },
  invalidQuestionId: {
    en: 'Invalid Question ID',
    vi: 'ID Câu Hỏi Không Hợp Lệ'
  },
  errorLoadingQuestion: {
    en: 'Error loading question. Please try again.',
    vi: 'Lỗi khi tải câu hỏi. Vui lòng thử lại.'
  },
  questionNotFound: {
    en: 'Question not found',
    vi: 'Không tìm thấy câu hỏi'
  },
  checkAnswer: {
    en: 'Check Answer',
    vi: 'Kiểm Tra Câu Trả Lời'
  },
  correctAnswer: {
    en: 'Correct answer!',
    vi: 'Câu trả lời đúng!'
  },
  incorrectAnswer: {
    en: 'Incorrect answer!',
    vi: 'Câu trả lời sai!'
  },
  tryAgain: {
    en: 'Try Again',
    vi: 'Thử Lại'
  },
  startQuiz: {
    en: 'Start Quiz',
    vi: 'Bắt Đầu Trắc Nghiệm'
  },
  // Quiz Detail Page - Sharing Functionality
  shareQuiz: {
    en: 'Share Quiz',
    vi: 'Chia Sẻ Câu Hỏi'
  },
  shareOnFacebook: {
    en: 'Share on Facebook',
    vi: 'Chia sẻ trên Facebook'
  },
  shareOnTwitter: {
    en: 'Share on Twitter',
    vi: 'Chia sẻ trên Twitter'
  },
  shareOnWhatsApp: {
    en: 'Share on WhatsApp',
    vi: 'Chia sẻ qua WhatsApp'
  },
  shareOnTelegram: {
    en: 'Share on Telegram',
    vi: 'Chia sẻ qua Telegram'
  },
  shareViaEmail: {
    en: 'Share via Email',
    vi: 'Chia sẻ qua Email'
  },
  copyLink: {
    en: 'Copy Link',
    vi: 'Sao chép liên kết'
  },
  linkCopied: {
    en: 'Link copied to clipboard!',
    vi: 'Đã sao chép liên kết!'
  },
  quizQuestion: {
    en: 'Quiz Question',
    vi: 'Câu Hỏi Trắc Nghiệm'
  },
  checkOutQuiz: {
    en: 'Check out this quiz question',
    vi: 'Xem câu hỏi trắc nghiệm này'
  },
  
  // Quiz Detail Page - Other elements
  questionDetail: {
    en: 'Question Detail',
    vi: 'Chi Tiết Câu Hỏi'
  },
  detail: {
    en: 'Detail',
    vi: 'Chi Tiết'
  },
  noAnswerProvided: {
    en: 'No answer provided',
    vi: 'Chưa có câu trả lời'
  },
  bookmark: {
    en: 'Bookmark',
    vi: 'Đánh Dấu'
  },
  removeBookmark: {
    en: 'Remove Bookmark',
    vi: 'Bỏ Đánh Dấu'
  },
  errorLoading: {
    en: 'Error loading question details',
    vi: 'Lỗi khi tải chi tiết câu hỏi'
  },
  changeBackground: {
    en: 'Change Background',
    vi: 'Đổi Hình Nền'
  },
  
  // QuizListPage translations
  questionLibrary: {
    en: 'Question Library',
    vi: 'Thư Viện Câu Hỏi'
  },
  exploreQuestionsLibrary: {
    en: 'Explore our comprehensive collection of questions, answers, and explanations. Use the filters below to find exactly what you need.',
    vi: 'Khám phá bộ sưu tập câu hỏi, câu trả lời và giải thích của chúng tôi. Sử dụng bộ lọc bên dưới để tìm chính xác những gì bạn cần.'
  },
  searchQuestions: {
    en: 'Search questions...',
    vi: 'Tìm kiếm câu hỏi...'
  },
  filters: {
    en: 'Filters',
    vi: 'Bộ Lọc'
  },
  questionId: {
    en: 'Question ID',
    vi: 'ID Câu Hỏi'
  },
  book: {
    en: 'Book',
    vi: 'Sách'
  },
  part: {
    en: 'Part',
    vi: 'Phần'
  },
  section: {
    en: 'Section',
    vi: 'Đoạn'
  },
  chapter: {
    en: 'Chapter',
    vi: 'Chương'
  },
  resetFilters: {
    en: 'Reset Filters',
    vi: 'Đặt Lại Bộ Lọc'
  },
  grid: {
    en: 'Grid View',
    vi: 'Xem Dạng Lưới'
  },
  list: {
    en: 'List View',
    vi: 'Xem Dạng Danh Sách'
  },
  showing: {
    en: 'Showing',
    vi: 'Hiển thị'
  },
  of: {
    en: 'of',
    vi: 'trong số'
  },
  questions: {
    en: 'questions',
    vi: 'câu hỏi'
  },
  sortBy: {
    en: 'Sort by',
    vi: 'Sắp xếp theo'
  },
  noQuestionsFound: {
    en: 'No Questions Found',
    vi: 'Không Tìm Thấy Câu Hỏi'
  },
  tryDifferentSearch: {
    en: 'Try different search criteria or reset filters',
    vi: 'Thử tiêu chí tìm kiếm khác hoặc đặt lại bộ lọc'
  },
  answerDescription: {
    en: 'Answer Description',
    vi: 'Mô Tả Câu Trả Lời'
  },
  // YOUCAT section translations
  youcatTitle: {
    en: 'YOUCAT - Catechism For Young People',
    vi: 'YOUCAT - Giáo Lý Cho Giới Trẻ'
  },
  youcatSubtitle: {
    en: 'Discover YOUCAT - the Catholic Catechism specifically designed for young people',
    vi: 'Khám phá YOUCAT - sách Giáo Lý Công Giáo được thiết kế đặc biệt cho người trẻ'
  },
  youcatDescription: {
    en: 'YOUCAT presents catechism in simple, visual language through 527 questions and answers. Translated into over 72 languages, this book helps you deeply understand the Catholic faith with a modern and approachable style.',
    vi: 'YOUCAT trình bày giáo lý với ngôn ngữ đơn giản, trực quan qua 527 câu hỏi-đáp. Đã được dịch sang hơn 72 ngôn ngữ, cuốn sách giúp bạn hiểu sâu về đức tin Công Giáo với cách tiếp cận hiện đại và gần gũi.'
  },
  exploreYoucat: {
    en: 'Explore YOUCAT',
    vi: 'Tìm Hiểu YOUCAT'
  },
  generalCatechismCategory: {
    en: 'General Catechism',
    vi: 'Giáo Lý Chung'
  },
  theCreedCategory: {
    en: 'The Creed',
    vi: 'Kinh Tin Kính'
  },
  theSacramentsCategory: {
    en: 'The Sacraments',
    vi: 'Các Bí Tích'
  },
  tenCommandmentsCategory: {
    en: 'The Ten Commandments',
    vi: 'Mười Điều Răn'
  },
  prayerSpiritualityCategory: {
    en: 'Prayer & Spirituality',
    vi: 'Cầu Nguyện & Tâm Linh'
  },
  churchHistoryCategory: {
    en: 'Church History',
    vi: 'Lịch Sử Giáo Hội'
  },
  socialTeachingsCategory: {
    en: 'Social Teachings',
    vi: 'Giáo Huấn Xã Hội'
  },
  difficultyLevelLabel: {
    en: 'Difficulty Level',
    vi: 'Mức Độ Khó'
  },
  easyDifficulty: {
    en: 'Easy',
    vi: 'Dễ'
  },
  mediumDifficulty: {
    en: 'Medium',
    vi: 'Trung Bình'
  },
  hardDifficulty: {
    en: 'Hard',
    vi: 'Khó'
  },
  mixedDifficulty: {
    en: 'Mixed',
    vi: 'Hỗn Hợp'
  },
  randomizeQuestionOrderLabel: {
    en: 'Randomize Question Order',
    vi: 'Xáo Trộn Thứ Tự Câu Hỏi'
  },
  numberOfQuestionsLabel: {
    en: 'Number of Questions',
    vi: 'Số Lượng Câu Hỏi'
  },
  timePerQuestionLabel: {
    en: 'Time per Question',
    vi: 'Thời Gian Cho Mỗi Câu Hỏi'
  },
  reviewTestSettingsHeading: {
    en: 'Review Test Settings',
    vi: 'Xem Lại Thiết Lập Kiểm Tra'
  },
  timeLimitLabel: {
    en: 'Time Limit',
    vi: 'Giới Hạn Thời Gian'
  },
  categoriesLabel: {
    en: 'Categories',
    vi: 'Danh Mục'
  },
  timerWarningMessage: {
    en: 'The timer will start as soon as you begin the test. Make sure you have enough time to complete it.',
    vi: 'Đồng hồ sẽ bắt đầu ngay khi bạn bắt đầu bài kiểm tra. Hãy đảm bảo bạn có đủ thời gian để hoàn thành nó.'
  },
  testTitleLabel: {
    en: 'Test Title',
    vi: 'Tiêu Đề Bài Kiểm Tra'
  },
  selectCategoriesError: {
    en: 'Please select at least one category',
    vi: 'Vui lòng chọn ít nhất một danh mục'
  },
  systemBuilding: {
    en: 'System is being built',
    vi: 'Hệ thống đang được xây dựng'
  },
  pleaseWait: {
    en: 'Please wait while we complete the process. You cannot perform any actions during this time.',
    vi: 'Vui lòng đợi trong khi chúng tôi hoàn thành quá trình. Bạn không thể thực hiện bất kỳ thao tác nào trong thời gian này.'
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Default to browser language or fall back to English
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'vi' ? 'vi' : 'en';
  };

  const [language, setLanguage] = useState<Language>(
    localStorage.getItem('language') as Language || getBrowserLanguage()
  );

  // Save language preference to localStorage whenever it changes
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 