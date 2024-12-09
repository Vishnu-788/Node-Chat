import mongoose, { Schema, Model, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface user extends Document {
  name: string;
  email: string;
  password: string;
  profileMeta?: ProfileMeta;
}

interface ProfileMeta {
  fileName: string;
  url: string;
  mimeType: string;
}

//Exported model interface (arguments are refered with this when using this model)
interface UserModel extends Model<user> {
  signup(
    name: string,
    email: string,
    password: string,
    profileMeta?: ProfileMeta
  ): Promise<user>;
  login(name: string, password: string): Promise<user>;
}

//Model for the user
const userSchema = new Schema<user>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileMeta: {
      fileName: {
        type: String,
        required: true,
        default: "default",
      },
      url: {
        type: String,
        required: true,
        default:
          "http://localhost:4000/uploads/some-unique-id-Default_image.png",
      },
      mimeType: {
        type: String,
        required: true,
        default: "image/png",
      },
    },
  },
  {
    timestamps: true,
  }
);

//Performs signup
userSchema.statics.signup = async function (
  name: string,
  email: string,
  password: string,
  profileMeta: ProfileMeta
) {
  // Validation
  if (!name || !email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  // Check if the email or username already exists
  const existingEmail = await this.findOne({ email });
  if (existingEmail) {
    throw new Error("This email or username already exists");
  }

  console.log("Profile Meta " + profileMeta.fileName);

  const pictureData: ProfileMeta = {
    fileName: profileMeta.fileName,
    url: profileMeta.url,
    mimeType: profileMeta.mimeType,
  };
  console.log("Profile Data " + pictureData);

  // Generate a hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Store the hash and user details in the DB
  const user: user = await this.create({
    name,
    email,
    password: hash,
    profileMeta: pictureData,
  });

  return user;
};

//Performs login
userSchema.statics.login = async function (email: string, password: string) {
  if (!email) {
    throw new Error("Email is Empty");
  }

  if (!password) {
    throw new Error("Password is empty");
  }

  // Check if the email exists in db
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  //compare the passwords if incorrect throw new error
  const match: boolean = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("invalid Login credentials");
  }

  return user;
};

const userModel = mongoose.model<user, UserModel>("ChatUsers", userSchema);
export default userModel;
