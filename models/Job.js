import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    company: {
      type: String,
      required: [true, 'Please specify the company name'],
      trim: true
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    companyLogo: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      required: [true, 'Please specify a job location or "Remote"'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select a job category'],
      enum: [
        'Software Development',
        'Product & Design',
        'Marketing & Growth',
        'Sales & Business',
        'Finance & Operations',
        'Customer Success',
        'Data & Analytics',
        'Human Resources',
        'Other'
      ],
      default: 'Software Development'
    },
    jobType: {
      type: String,
      required: true,
      enum: ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'],
      default: 'Full-time'
    },
    experienceLevel: {
      type: String,
      enum: ['Entry', 'Mid', 'Senior'],
      default: 'Mid'
    },
    salaryMin: {
      type: Number,
      default: 0
    },
    salaryMax: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    description: {
      type: String,
      required: [true, 'Please provide a comprehensive job description']
    },
    responsibilities: {
      type: [String],
      default: []
    },
    requirements: {
      type: [String],
      default: []
    },
    benefits: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending' // Mandatory Admin Approval feature
    },
    featured: {
      type: Boolean,
      default: false
    },
    applicantsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for search queries
JobSchema.index({ title: 'text', description: 'text', company: 'text' });

export default mongoose.model('Job', JobSchema);

